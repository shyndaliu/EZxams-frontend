import { getToken } from 'next-auth/jwt';
import { jsonrepair } from 'jsonrepair';
import { listAllCalendars, listAllEvents, createCalendar, addEvent } from './calendar-api';
import { fetchCreateTable, fetchUpdateBalance, fetchCheckBalance } from '../auth/[...nextauth]/testroute';
import { OpenAIDefault } from '@/lib/OpenAIDefault';



function extractUpcomingEvents(events, start, deadline) {
    const oneHourFromNow = new Date(start);
    const deadlineDateTime = new Date(deadline);

    let upcomingEvents = events.filter((event) => {
        const startDateTime = new Date(event.start);
        const endDateTime = new Date(event.end);
        return (endDateTime.getTime() > oneHourFromNow.getTime()) && (startDateTime.getTime() < deadlineDateTime.getTime());
    });
    upcomingEvents.sort((a, b) => {
        const aStartDateTime = new Date(a.start);
        const bStartDateTime = new Date(b.start);
        return aStartDateTime - bStartDateTime;
    });

    return upcomingEvents;
}
function toUTCString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function calculateAvailableTimeSlots(events, startTime, deadline) {
    let currentDay = new Date(startTime);
    currentDay.setHours(0, 0, 0, 0);
    currentDay.setDate(currentDay.getDate() + 1);

    let startP = new Date(startTime);
    startP.setHours(0);
    let endP = new Date(startTime);
    endP.setHours(7);

    events.push({
        start: toUTCString(startP),  // the last one end -> max(7am and current time)
        end: new Date(startTime).getTime() > endP.getTime() ? startTime : toUTCString(endP)
    })

    startP = new Date(deadline);
    startP.setHours(23);
    endP = new Date(deadline);
    endP.setDate(new Date(deadline).getDate() + 1)
    endP.setHours(0);

    events.push({
        start: new Date(deadline).getTime() < startP.getTime() ? deadline : toUTCString(startP),  // the last one end -> max(7am and current time)
        end: toUTCString(endP)
    })

    startP = new Date(startTime);
    startP.setHours(23);
    endP = new Date(startTime);
    endP.setDate(new Date(startTime).getDate() + 1)
    endP.setHours(0);

    events.push({
        start: toUTCString(startP), end: toUTCString(endP)
    })

    startP = new Date(deadline);
    startP.setHours(0);
    endP = new Date(deadline);
    endP.setHours(7);

    events.push({
        start: toUTCString(startP), end: toUTCString(endP)
    })

    let endDay = new Date(deadline);
    endDay.setHours(0, 0, 0);

    while (currentDay < endDay) {
        startP = new Date(currentDay);
        startP.setHours(23);
        endP = new Date(currentDay);
        endP.setDate(new Date(currentDay).getDate() + 1)
        endP.setHours(0);

        events.push({
            start: toUTCString(startP), end: toUTCString(endP)
        })

        startP = new Date(currentDay);
        startP.setHours(0);
        endP = new Date(currentDay);
        endP.setHours(7);

        events.push({
            start: toUTCString(startP), end: toUTCString(endP)
        })
        currentDay.setDate(currentDay.getDate() + 1);
    }


    events.sort((a, b) => {
        const aStartDateTime = new Date(a.start);
        const bStartDateTime = new Date(b.start);
        return aStartDateTime - bStartDateTime;
    });



    let newTable = [];
    let i = 0, j = 1;
    while (j < events.length && i < events.length) {
        let end = new Date(events[i].end);
        let start = new Date(events[j].start);
        while (start <= end) {
            i++;
            j = i + 1;
            if (i >= events.length || j >= events.length) {
                return newTable;
            }
            end = new Date(events[i].end);
            start = new Date(events[j].start);
        }
        let payload = { start: events[i].end, end: events[j].start };
        newTable.push(payload);
        i = j;
        j = i + 1;
    }
    return newTable;

}
function formatTimeIntervals(intervals) {
    const formattedIntervals = {};

    // Step 2 and 3: Loop through each time interval and convert date and time to desired format
    intervals.forEach(interval => {
        const startDate = new Date(interval.start);
        const endDate = new Date(interval.end);

        const startFormatted = `${startDate.getHours().toString().padStart(2, '0')}:00`;
        const endFormatted = `${endDate.getHours().toString().padStart(2, '0')}:00`;

        const key = `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;

        // Step 4: Create dictionary with formatted intervals
        if (!formattedIntervals[key]) {
            formattedIntervals[key] = [`${startFormatted}-${endFormatted}`];
        } else {
            formattedIntervals[key].push(`${startFormatted}-${endFormatted}`);
        }
    });

    return formattedIntervals;
}

function convertSchedule(schedule, userTimeZone) {
    const convertedSchedule = [];
    const currentYear = new Date().getFullYear();
    for (const date in schedule) {
        for (const time in schedule[date]) {
            const event = schedule[date][time];
            const [day, month] = date.split('.');
            const [startTime, endTime] = time.split("-");
            let [hour, minute] = startTime.split(':');

            const startDate = new Date(currentYear, month - 1, day, hour, minute);

            [hour, minute] = endTime.split(':');
            const endDate = new Date(currentYear, month - 1, day, hour, minute);

            const eventObj = {
                summary: event.title,
                description: event.desc,
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: userTimeZone,
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: userTimeZone,
                },
            };

            convertedSchedule.push(eventObj);
        }
    }
    return convertedSchedule;
}

function convertSchedule2(schedule) {
    for (const date in schedule) {
        for (const time in schedule[date]) {
            schedule[date][time] = schedule[date][time].desc
        }
    }
    return schedule;
}


export async function POST(req, res) {
    let body = await req.json();
    const token = await getToken({ req });
    const accessToken = token?.account?.access_token;

    let user_balance = await fetchCheckBalance(token.user.email);

    if (user_balance > 100000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }

    let data = await listAllCalendars(accessToken);
    if (!data.items) {
        return new Response("User is unauthenticated", {
            status: 401,
            headers: { 'Content-Type': 'text/html' }
        });
    }
    data = data.items;
    let userTimeZone = data[0].timeZone;
    let calendars = data.map(calendar => ({ "id": calendar.id, "name": calendar.summary }));


    let allEvents = [];
    for (let calendar in calendars) {
        let response = await listAllEvents(accessToken, calendars[calendar].id);
        if (!response.items) {
            continue;
        }
        let events = response.items
        events = events.filter(event => (event.start?.dateTime && event.end?.dateTime));
        events = events.map(event => ({ "start": event.start.dateTime.substring(0, 19), "end": event.end.dateTime.substring(0, 19) }))
        allEvents = allEvents.concat(events);
    }


    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1, 0, 0);
    currentTime = toUTCString(currentTime);
    let deadline = body.deadline;
    deadline = deadline.substring(1, deadline.length - 1);


    const upcomingEvents = extractUpcomingEvents(allEvents, currentTime, deadline + ":00");


    const freeTime = calculateAvailableTimeSlots(upcomingEvents, currentTime, deadline + ":00");


    const formattedFreeTime = formatTimeIntervals(freeTime);


    let payload = {
        "model": "text-davinci-003",
        "prompt": `You are assistant that only speaks JSON and do not use normal language. Your goal now is to help me make my schedule. I will give you a dictionary of time intervals when i am available, timing (table showing how much time i will spend on tasks) and tasks that i must finish like this: 
        "
        {'23.06': ['9:00-13:00', '16:00-23:00']}
        {
        'Chain Rule': ['30 min'],
        'Function of several variables': ['45 min', '45 min', '60 min', '15 min'],
        }
        {'Chain Rule': ["Quick review of basic concepts"], 'Partial derivatives': ["Learn basic concepts first", "Practice finding partial derivatives of simple functions", "As you gain more confidence, move on medium problems", "Test you knowledge"]
        }" you must return new timetable as a JSON formatted string with tasks as desc and topics as title , like this:
        "{
        '23.06':
        {'9:00-9:30': {title: "Chain Rule", desc: "Quick review of basic concepts"} , '9:30-10:15': {title: "Partial derivatives", desc: "Learn basic concepts first"} , '10:15-12:00': {title: "Partial derivatives", desc: "Practice finding partial derivatives of simple functions"} , '16:00-19:00':   {title: "Partial derivatives", desc:"As you gain more confidence, move on medium problems"}, '19:00-20:00':  {title: "Partial derivatives", desc:"Test you knowledge"}}
        }"
        (You should adapt the sample timetable according to the lists that i gave. When creating the schedule you can neglect timing, your MAIN GOAL is to put tasks only during the time i showed. The plan should be self-explanatory, logicaly right, realistic in respect of complexity; leave space for breaks, but do not include it to schedule; put more breaks at the evening and more complex problems at the morning/afternoon, don't refer to the example I gave you.). My timetable, list of time spans and list of topics are 
        "
        ${JSON.stringify(formattedFreeTime)}
        ${JSON.stringify(body.timing)}
        ${JSON.stringify(body.tasks)}" (Give me schedule only)`,
        "temperature": 1.1,
        "max_tokens": 2000
    }


    let [tokens, table] = await OpenAIDefault(payload);
    if (typeof tokens !== "number") {
        return new Response("Too many requests", {
            status: 429,
            headers: { 'Content-Type': 'text/html' }
        });
    }
    await fetchUpdateBalance(token.user.email, tokens);

    try {
        table = jsonrepair(table)
    } catch (err) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }


    let tableForEvents;
    try {
        tableForEvents = convertSchedule(JSON.parse(table), userTimeZone);
    } catch (error) {
        console.error(error);
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }



    const tableForDB = convertSchedule2(JSON.parse(table));
    let tableForDBDescription;


    payload = {
        "model": "text-davinci-003",
        "prompt": `You are assistant who speaks only JSON. I will give you my timetable with tasks like this:
        "{'23.06':
        {'16:00-16:30': "Quick review of basic concepts", '16:30-16:45': "Learn basic concepts first", '16:45-17:30': "Practice finding partial derivatives of simple functions", '18:00-19:00': "As you gain more confidence, move on medium problems", '19:00-19:15': "Test you knowledge"}
        }"
        You must return me the same table as a JSON formatted string, but replace every task with an advise or motivation like this:
        "{'23.06':
        {'16:00-16:30': "It is okay to spend more time on topics, that you are not familiar with.", '16:30-16:45': "Underline the hardest topics and try to understand them better",  '16:45-17:30': "It is always better to practice on simple examples first", '18:00-19:00': "Don't be upset if it's still hard for you, just return to simple examples and try understand what causes a problem", '19:00-19:15': "Be strict, but no harsh to yourself"}
        }"
        (You should adapt the sample timetable according to the plan that i gave. The plan should be self-explanatory, motivational, written with friendly tone, don't refer to the example I gave you.).
        Here is my plan:
        "${JSON.stringify(tableForDB)}" (give me altered plan only)`,
        "temperature": 1.3,
        "max_tokens": 2000
    }

    await new Promise((resolve) => setTimeout(resolve, 6000));

    [tokens, tableForDBDescription] = await OpenAIDefault(payload);


    if (typeof tokens !== "number") {
        return new Response("Too many requests", {
            status: 429,
            headers: { 'Content-Type': 'text/html' }
        });
    }
    await fetchUpdateBalance(token.user.email, tokens);

    try {
        tableForDBDescription = jsonrepair(tableForDBDescription)
    } catch (err) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    let ezxamsCalendarID = await createCalendar(accessToken, calendars, userTimeZone);
    ezxamsCalendarID = ezxamsCalendarID.id;

    for (let event in tableForEvents) {
        await addEvent(accessToken, ezxamsCalendarID, tableForEvents[event]);
    }

    await fetchCreateTable(token.user.email, tableForDB, JSON.parse(tableForDBDescription), deadline)
    return new Response("Done", {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
    });
};

import { getToken } from 'next-auth/jwt';
import { listAllCalendars, listAllEvents } from './calendar-api';



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

    while (currentDay.getDate() < new Date(deadline).getDate()) {
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

    console.log(events);

    let newTable = [];
    let i = 0, j = 1;
    while (j < events.length) {
        let end = new Date(events[i].end);
        let start = new Date(events[j].start);
        while (start <= end) {
            i++;
            j = i + 1;
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



export async function GET(req, res) {

    const token = await getToken({ req });
    console.log(token);
    const accessToken = token.account.access_token;

    let data = await listAllCalendars(accessToken);
    data = data.items;
    let calendars = data.map(calendar => ({ "id": calendar.id, "name": calendar.summary }));
    console.log(calendars); //console


    let allEvents = [];
    for (let calendar in calendars) {
        let response = await listAllEvents(accessToken, calendars[calendar].id);
        console.log(calendars[calendar].id);
        if (!response.items) {
            continue;
        }
        let events = response.items
        events = events.filter(event => (event.start?.dateTime && event.end?.dateTime));
        events = events.map(event => ({ "start": event.start.dateTime.substring(0, 19), "end": event.end.dateTime.substring(0, 19) }))
        allEvents = allEvents.concat(events);
    }
    console.log(allEvents);

    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1, 0, 0);
    currentTime = toUTCString(currentTime);
    const deadline = '2023-07-28T09:00:00';


    const upcomingEvents = extractUpcomingEvents(allEvents, currentTime, deadline);
    console.log(upcomingEvents);

    const freeTime = calculateAvailableTimeSlots(upcomingEvents, currentTime, deadline);
    console.log(freeTime);
    return Response.json(freeTime);
};
export async function POST(req, res) {
    const token = await getToken({ req });
    console.log(token);
    const accessToken = token.account.access_token;
}

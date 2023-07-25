
export async function listAllCalendars(accessToken) {
    const res = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch((e) => console.log(e));
    return await res.json();
};

export async function listAllEvents(accessToken, calendarID) {
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch((e) => console.log(e));
    return await res.json();
};

export async function createCalendar(accessToken, calendars, userTimeZone) {
    for (let calendar in calendars) {
        if (calendars[calendar].name == "EZxams") {
            return { id: calendars[calendar].id }
        }
    }
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ summary: "EZxams", timeZone: userTimeZone }),
    }).catch((e) => console.log(e));
    const body = await res.json();
    console.log(body);
    return { id: body.id }
}

export async function addEvent(accessToken, calendarID, event) {
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(event),
    }).catch((e) => console.log(e));
    let body = await res.json();
    console.log(body);
    return new Response(200);
}
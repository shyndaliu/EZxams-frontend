
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

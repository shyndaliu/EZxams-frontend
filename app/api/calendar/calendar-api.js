
export async function listAllCaledars(accessToken) {
    const res = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch((e) => console.log(e));
    return await res.json();
};


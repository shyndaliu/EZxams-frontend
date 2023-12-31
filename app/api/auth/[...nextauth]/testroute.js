
export async function fetchSignIn(session) {
    const { email, image } = session?.user || {};
    fetch("https://fastapi-lnnw.onrender.com/auth/users", {
        method: "POST",
        body: JSON.stringify({
            "email": email,
        }),
        headers: {
            "content-type": "application/json",
        },
    }).catch((e) => console.log(e));
}

export async function fetchActiveTable(email) {
    try {
        const response = await fetch(`https://fastapi-lnnw.onrender.com/tables?email=${email}`);
        if (response.ok) {
            const data = await response.json();
            return data["table"]
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}




export async function fetchCheckBalance(email) {
    try {
        const response = await fetch(`https://fastapi-lnnw.onrender.com/auth/users/balance?email=${email}`);
        if (response.ok) {
            const data = await response.json();
            return data["balance"]
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

export async function fetchUpdateBalance(email, new_balance) {
    fetch("https://fastapi-lnnw.onrender.com/auth/users/balance", {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "new_balance": new_balance
        }),
        headers: {
            "content-type": "application/json",
        },
    }).catch((e) => console.log(e));
}

export async function fetchCreateTable(email, body, description, deadline) {
    fetch("https://fastapi-lnnw.onrender.com/tables", {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "body": body,
            "description": description,
            "deadline": deadline
        }),
        headers: {
            "content-type": "application/json",
        },
    }).catch((e) => console.log(e));
}
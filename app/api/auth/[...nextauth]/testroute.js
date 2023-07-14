
export async function fetchSignIn(session) {
    const { email, image } = session?.user || {};
    fetch("http://localhost:8000/auth/users", {
        method: "POST",
        body: JSON.stringify({
            "email": email,
        }),
        headers: {
            "content-type": "application/json",
        },
    }).catch((e) => console.log(e));
}

export async function fetchActiveTable(session) {
    const { email, image } = session?.user || {};
    try {
        const response = await fetch(`http://localhost:8000/tables?email=${email}`);
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
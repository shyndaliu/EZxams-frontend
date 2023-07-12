import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
export async function fetchHello() {
    const session = await getServerSession(authOptions);
    const { email, image } = session?.user

    const options = {
        method: 'POST',
        url: 'https://localhost:8000/auth',
        body: JSON.stringify({
            email: email
        }),
    };

    fetch('https://localhost:8000/auth', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
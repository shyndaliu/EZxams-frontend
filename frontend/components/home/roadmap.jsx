'use client';
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Roadmap() {
    const session = await getServerSession(authOptions);
    const handleTap = () => {
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
    };
    return <>
        here is your progress
        <button onClick={handleTap}>tap</button >
    </>
}
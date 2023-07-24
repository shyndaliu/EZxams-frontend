'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CalTest() {
    const [loading, setLoading] = useState(false);
    const [subsList, setSubsList] = useState([]);

    useEffect(async () => {
        console.log('test');
        if (loading) {
            const data = await fetch("api/calendar", {
                method: 'GET'
            });
            console.log(data);
            setSubsList(
                data.map((sub) => ({
                    id: sub.id,
                    title: sub.snippet.title,
                }))
            );
            setLoading(false);
        }
    }, [loading]);

    return (
        <div>

            <h1>NextAuth Youtube Auth Test</h1>

            <button
                onClick={() => setLoading(!loading)}
                disabled={loading || subsList.length}
            >
                Get My calendars
            </button>
            {loading && <p>Loading...</p>}
            <ul>
                {subsList.map((sub) => (
                    <li key={sub.id}>{sub.title}</li>
                ))}
            </ul>
        </div>
    );
}
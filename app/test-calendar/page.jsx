// pages/calendar.js

import { useQuery } from 'react-query';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Calendar() {
    const { data, isLoading, isError } = useQuery('calendar', fetchEvents);

    const handleSignIn = () => {
        signIn('google');
    };

    const handleSignOut = () => {
        signOut();
    };

    if (!isLoading && isError) {
        return (
            <div>
                <p>Error fetching events. Please sign in with Google.</p>
                <button onClick={handleSignIn}>Sign In with Google</button>
            </div>
        );
    }

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>Google Calendar Events</h1>
                    <button onClick={handleSignOut}>Sign Out</button>
                    {data.events.map((event) => (
                        <div key={event.id}>
                            <h3>{event.summary}</h3>
                            <p>{event.start.dateTime}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

async function fetchEvents() {
    try {
        const response = await axios.get('/api/calendar');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching events');
    }
}

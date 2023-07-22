import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

const calendar = google.calendar({
    version: 'v3',
    auth: authClient, // Your Google API Key here, not the client secret
});

export default async (req, res) => {
    const session = await getSession({ req });

    if (!session?.user?.tokens) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Use the stored refresh token to get a new access token
    const { tokens } = await google.auth.refreshAccessToken({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: session.user.tokens.refresh_token,
    });

    // Use the new access token to fetch events from the Google Calendar
    google.options({ auth: tokens.access_token });

    try {
        const response = await calendar.events.list({
            calendarId: 'primary', // Use 'primary' for the user's primary calendar
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items;
        return res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return res.status(500).json({ error: 'Failed to fetch events' });
    }
};

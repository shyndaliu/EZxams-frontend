import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import qs from "querystring";

const queryParams = ({
    prompt: "consent",
    access_type: "offline",
    response_type: "code"
});


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope:
                        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
                    authorizationUrl:
                        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&prompt=consent`,
                    accessTokenUrl: 'https://oauth2.googleapis.com/token'
                },
            },
        }),
    ],
    callbacks: {
        async jwt(token) {
            return token;
        },
        async session(session, token) {

            return session;
        },
    },
})

export { handler as GET, handler as POST };

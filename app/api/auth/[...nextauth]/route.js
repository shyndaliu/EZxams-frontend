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
                        `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`,
                },
            },
        }),
    ],
    callbacks: {

        async jwt(token, user, account, profile, isNewUser) {

            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            console.log(token);
            return token;
        },
        async session(session, token) {
            session.user = {
                name: token.name,
                email: token.email,
                image: token.image,
            };
            return session;
        },
    },
})

export { handler as GET, handler as POST };

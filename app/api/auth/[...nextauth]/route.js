import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    // callbacks: {
    //     async jwt(token, user, account) {

    //         const refreshAccessToken = async function (token) {
    //             try {
    //                 const url =
    //                     "https://oauth2.googleapis.com/token?" +
    //                     new URLSearchParams({
    //                         client_id: process.env.GOOGLE_CLIENT_ID,
    //                         client_secret: process.env.GOOGLE_CLIENT_SECRET,
    //                         grant_type: "refresh_token",
    //                         refresh_token: token.refreshToken,
    //                     })

    //                 const response = await fetch(url, {
    //                     headers: {
    //                         "Content-Type": "application/x-www-form-urlencoded",
    //                     },
    //                     method: "POST",
    //                 })

    //                 const refreshedTokens = await response.json()

    //                 if (!response.ok) {
    //                     throw refreshedTokens
    //                 }

    //                 return {
    //                     ...token,
    //                     accessToken: refreshedTokens.access_token,
    //                     accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    //                     refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    //                 }
    //             } catch (error) {
    //                 console.log(error)

    //                 return {
    //                     ...token,
    //                     error: "RefreshAccessTokenError",
    //                 }
    //             }
    //         }

    //         if (account && user) {
    //             return {
    //                 accessToken: account.accessToken,
    //                 accessTokenExpires: Date.now() + account.expires_in * 1000,
    //                 refreshToken: account.refresh_token,
    //                 user,
    //             }
    //         }

    //         // Return previous token if the access token has not expired yet
    //         if (Date.now() < token.accessTokenExpires) {
    //             return token
    //         }

    //         return await refreshAccessToken(token)
    //     },
    //     async session(session, token) {
    //         if (token) {
    //             session.user = token.user
    //             session.accessToken = token.accessToken
    //             session.error = token.error
    //         }

    //         return session
    //     },
    // },
})

export { handler as GET, handler as POST };

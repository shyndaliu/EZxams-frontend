import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";
import { encode } from "querystring";

function base64URLEncode(str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const verifier = base64URLEncode(crypto.randomBytes(32));
const codeChallenge = base64URLEncode(crypto.createHash('sha256').update(verifier).digest());
const queryParams = encode({
  prompt: "consent",
  access_type: "offline",
  response_type: "code",
  state: encodeURIComponent(verifier), // URL-encode the verifier
  code_challenge: codeChallenge,
  code_challenge_method: "S256",
});


export const authOptions = {
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
      callbacks: {
        async redirect({ url, baseUrl }) {
          return url.startsWith(baseUrl + "/api/auth/callback/google")
            ? url
            : baseUrl;
        },
      },
    }),
  ],
};

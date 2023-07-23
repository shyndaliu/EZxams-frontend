import GoogleProvider from "next-auth/providers/google";
import { encode } from "querystring";


const { randomBytes, createHash } = require("node:crypto");

function generatePKCEPair() {
  const NUM_OF_BYTES = 22; // Total of 44 characters (1 Bytes = 2 char) (standard states that: 43 chars <= verifier <= 128 chars)
  const HASH_ALG = "sha256";
  const randomVerifier = randomBytes(NUM_OF_BYTES).toString('hex')
  const hash = createHash(HASH_ALG).update(randomVerifier).digest('base64');
  const challenge = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Clean base64 to make it URL safe
  return { verifier: randomVerifier, challenge }
}
const codes = generatePKCEPair();

const queryParams = ({
  prompt: "consent",
  access_type: "offline",
  response_type: "code"
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
    }),
  ],
};

import { google } from "googleapis";
import { getSession } from "next-auth/react";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const verifier = decodeURIComponent(searchParams.get("state"));

    if (!code) {
        return new Response('Authorization code not found in the query.', {
            status: 400
        });
    }
    ///////////


    const { google } = require('googleapis');

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGGLE_REDIRECT_URL;


    const authClient = new google.auth.OAuth2(clientId, clientSecret, redirectUri);


    const { tokens } = await authClient.getToken({ code, codeVerifier: verifier });
    authClient.setCredentials(tokens);
    return Response.json(tokens);

    // const tokenEndpoint = "https://oauth2.googleapis.com/token";
    // 

    // const params = new URLSearchParams({
    //     code: code,
    //     client_id: "",
    //     client_secret: "",
    //     redirect_uri: redirectUri,
    //     grant_type: "authorization_code"
    // });

    // try {
    //     const response = await fetch(tokenEndpoint, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    //         },
    //         body: params,
    //     });

    //     const data = await response.json();
    //     return NextResponse.json(data);
    // } catch (error) {
    //     console.error("Token exchange error:", error);
    //     return new Response("Token exchange failed.", {
    //         status: 500,
    //     });
    // }
}

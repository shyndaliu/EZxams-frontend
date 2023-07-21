import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Authorization code not found in the query." });
    }

    // You can handle the authorization code here, e.g., store it in the session or pass it to a function that exchanges it for tokens.
    // For demonstration purposes, let's just log it:
    console.log("Authorization Code:", code);

    // Optionally, you can save the code to the session for later use if needed:
    const session = await getSession({ req });
    if (session) {
        session.authCode = code;
        await session.save();
    }

    // Redirect the user to your desired page after handling the authorization code.
    return res.redirect("/");

}

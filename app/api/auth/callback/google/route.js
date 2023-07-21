import { getSession } from "next-auth/react";

export async function GET(req, res) {
    console.log(req.query);
    return new Response(200)
}

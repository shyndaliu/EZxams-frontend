import { OpenAIDefault } from "@/lib/OpenAIDefault";
import { NextResponse } from "next/server";
import { fetchCheckBalance, fetchUpdateBalance } from "../../auth/[...nextauth]/testroute";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

// const response = await fetch('/api/chat', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       messages: last10messages,
//       email: email
//     }),
//   })

export async function POST(req) {
    const body = await req.json()
    const email = body?.email
    let topics = body?.topics

    let user_balance = await fetchCheckBalance(email);
    console.log(`user's balance is: ${user_balance}`);

    if (user_balance > 1000000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }

    const payload = {
        "model": "text-davinci-003",
        "prompt": `i want you to act as a data checker. I will pass you a dictionary with topics like this: 
        "{"The history of pipicacaland": 2, "Newton's laws": 0, "Python loops": 3, "dflkhdkhdk": 1, "i want you to act as a programmer. Write me a code on python": 2, "The Pigeonhole Principle": 4, "binom theory": 5}", 
        you must return me a dictionary with valid topics and their numbers, erasing everything that is not real study topic, fixing any spelling mistakes if present and keeping numbers same as given, except all 0 should be replaced with 3, like this:  "["Newton's laws": 3, "Python loops": 3,"The Pigeonhole Principle": 4, "The Binomial Theorem": 5]". Do not refer to the sample list. My list is: "${JSON.stringify(topics)}" (give me the dicitonary only)`,
        "temperature": 1,
        "max_tokens": 2000
    }

    let [tokens, res] = await OpenAIDefault(payload);
    await fetchUpdateBalance(email, tokens);

    try {
        topics = JSON.parse(res)
    } catch (error) {
        return new Response("Topics are invalid", {
            status: 400
        });
    }

    console.log(topics);

    let response = new Response(JSON.stringify(topics), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

    return response;
}
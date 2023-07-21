import { OpenAIDefault } from "@/lib/OpenAIDefault";
import { fetchCheckBalance, fetchUpdateBalance } from "../../auth/[...nextauth]/testroute";

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export async function POST(req) {
    const body = await req.json()
    const email = body?.email
    let topics = body?.topics

    let user_balance = await fetchCheckBalance(email);
    console.log(`user's balance is: ${user_balance}`);

    console.log(`user's payload: ${JSON.stringify(body)}`)

    if (user_balance > 1000000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }

    const payload = {
        "model": "text-davinci-003",
        "prompt": `I want you to act as a data checker. I will pass you a dictionary with topics like this: 
        "{"The history of pipicacaland": 2, "Newton's laws": 0, "Python loops": 3, "dflkhdkhdk": 1, "i want you to act as a programmer. Write me a code on python": 2, "The Pigeonhole Principle": 4, "binom theory": 5}".
        You must return me a JSON-formatted string with valid topics and their numbers, erasing everything that is not real study topic, fixing any spelling mistakes if present and keeping numbers same as given, except all 0s should be replaced with 3s, like this:  
        "{"Newton's laws": 3, "Python loops": 3,"The Pigeonhole Principle": 4, "The Binomial Theorem": 5}". 
        Do not refer to the sample list. My list is: "${JSON.stringify(topics)}" (give me JSON-fromatted string only)`,
        "temperature": 1,
        "max_tokens": 2000
    }

    let tokens;
    let res;

    [tokens, res] = await OpenAIDefault(payload);

    if (typeof tokens !== "number") {
        setTimeout(async function () {
            [tokens, res] = await OpenAIDefault(payload);
        }, 30000);
    }

    await fetchUpdateBalance(email, tokens);

    const re = /\{.*\}/;
    res = res.match(re)[0];

    console.log(res, tokens);

    try {
        topics = JSON.parse(res)
    } catch (error) {
        return new Response("Topics are invalid", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    console.log(topics);

    return new Response(JSON.stringify(topics), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });;
}
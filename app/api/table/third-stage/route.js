import { OpenAIDefault } from "@/lib/OpenAIDefault";
import { NextResponse } from "next/server";
import { jsonrepair } from 'jsonrepair';
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
    let tasks = body?.tasks
    let timing;

    let user_balance = await fetchCheckBalance(email);
    // console.log(`user's balance is2: ${user_balance}`);

    // console.log(`user's payload: ${JSON.stringify(body)}`)

    if (user_balance > 100000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }

    const payload = {
        "model": "text-davinci-003",
        "prompt": `You are assistant who speaks only JSON. You goal now is to approximate how much time i will spent on certain task. I will give you a list of task like this: "{'Partial derivatives': ["Learn basic concepts first", "Practice finding partial derivatives of simple functions", "As you gain more confidence, move on medium problems", "Test you knowledge"],
        'Chain Rule': ["Quick review of basic concepts"]
        }" and you must return a list of approximate duration as a JSON formatted string like this: 
        "{'Partial derivatives': ["60 min", "60 min", "120 min", "30 min"],
        'Chain Rule': ["15 min"]
        }" . (You should adapt the sample plan according to the list of tasks I gave. The plan should be self-explanatory, appropriate to the type of tasks, don't refer to the example I gave you.). My list of tasks is "${JSON.stringify(tasks)}" (Give me plan only)`,
        "temperature": 1,
        "max_tokens": 700
    }

    let tokens;
    let res;

    [tokens, res] = await OpenAIDefault(payload);

    if (typeof tokens !== "number") {
        return new Response("Too many requests", {
            status: 429,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // console.log(tokens, res);

    await fetchUpdateBalance(email, tokens);

    try {
        res = res.replace(/\n/g, ' ');
        res = res.match(/\{.+\}/)[0];
    } catch (error) {
        console.error(error);
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // console.log(tokens, res);


    try {
        res = jsonrepair(res)
    } catch (err) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }
    // console.log(res, tokens);

    try {
        timing = JSON.parse(res)
    } catch (error) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // console.log(timing);

    await new Promise((resolve) => setTimeout(resolve, 15000));

    return new Response(JSON.stringify(timing), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });;
}
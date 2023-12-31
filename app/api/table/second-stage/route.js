import { OpenAIDefault } from "@/lib/OpenAIDefault";
import { fetchCheckBalance, fetchUpdateBalance } from "../../auth/[...nextauth]/testroute";
import { jsonrepair } from "jsonrepair";

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
    const body = await req.json();
    const email = body?.email;
    let topics = body?.topics;
    let tasks;

    let user_balance = await fetchCheckBalance(email);
    // console.log(`user's balance is1: ${user_balance}`);

    // console.log(`user's payload: ${JSON.stringify(body)}`)

    if (user_balance > 100000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }

    const payload = {
        "model": "text-davinci-003",
        "prompt": `You are assistant who only speaks JSON. I want you to act as great teacher and study coach. Your goal now is to make a detailed and effective exam preparation plan. I will give you a list of topics that will be on exam with corresponding level of my knowledge like this: 
        "{"Partial derivatives" : 1, "Chain rule": 5, "Function of several variables": 3}". 
        You must return me a study plan as a JSON fromatted string like this: 
        "{"Partial derivatives": ["Learn basic concepts first", "Practice finding partial derivatives of simple functions", "As you gain more confidence, move on medium problems", "Test you knowledge"], "Chain Rule": ["Quick review of basic concepts"],"Function of several variables": ["Review the fundamentals of functions of several variables", "Solve problems involving optimization and critical points of functions of several variables."]}". 
        (You should adapt the sample plan according to the list of topics I gave. The plan should be self-explanatory, appropriate to the subject and suitable to my level, don't refer to the example I gave you.). My list of topics is "${JSON.stringify(topics)}" (Give me plan only) `,
        "temperature": 1,
        "max_tokens": 800,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
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

    // console.log(res, tokens);

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
        res = jsonrepair(res);
    } catch (error) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }


    try {
        tasks = JSON.parse(res)
    } catch (error) {
        return new Response("Something went wrong.", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // console.log(tasks);

    await new Promise((resolve) => setTimeout(resolve, 6000));

    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
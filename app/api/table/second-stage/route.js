import { OpenAIDefault } from "@/lib/OpenAIDefault";
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
    const body = await req.json();
    const email = body?.email;
    let topics = body?.topics;
    let tasks;

    let user_balance = await fetchCheckBalance(email);
    console.log(`user's balance is1: ${user_balance}`);

    if (user_balance > 1000000) {
        return new Response('Token limit is exceeded', {
            status: 402
        });
    }
    console.log(topics);

    const payload = {
        "model": "text-davinci-003",
        "prompt": `I want you to act as great teacher and study coach. Your goal now is to make a detailed and effective exam preparation plan. I will give you a list of topics that will be on exam with corresponding level of my knowledge like this: 
        "{"Partial derivatives" : 1, "Chain rule": 5, "Function of several variables": 3}". 
        You must return me a study plan as a JSON-formatted string like this: 
        "{"Partial derivatives": ["Learn basic concepts first", "Practice finding partial derivatives of simple functions", "As you gain more confidence, move on medium problems", "Test you knowledge"],
        "Chain Rule": ["Quick review of basic concepts"], "Function of several variables": ["Review the fundamentals of functions of several variables", "Solve problems involving optimization and critical points of functions of several variables."]}" 
        (You should adapt the sample plan according to the list of topics I gave. The plan should be self-explanatory, appropriate to the subject and suitable to my level, don't refer to the example I gave you) My list of topics is "${JSON.stringify(topics)}" (give me JSON-fromatted string only) `,
        "temperature": 1,
        "max_tokens": 3000,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
    }
    let tokens;
    let res;

    [tokens, res] = await OpenAIDefault(payload);

    await fetchUpdateBalance(email, tokens);

    try {
        tasks = JSON.parse(res)
    } catch (error) {
        return new Response("Topics are invalid", {
            status: 400,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    console.log(tasks);

    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
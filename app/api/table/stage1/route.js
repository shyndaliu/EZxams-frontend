import { OpenAIDefault } from "@/lib/OpenAIDefault";

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

    const payload = {
        "model": "gpt-3.5-turbo",
        "prompt": "Say this is a test",
        "temperature": 1.3,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "logprobs": null,
        "stop": "\n"
    }

    const res = await OpenAIDefault(payload)
    return res
}
export async function OpenAIDefault(payload) {

    const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    }

    if (process.env.OPENAI_API_ORG) {
        requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
    }

    const res = await fetch('https://api.openai.com/v1/completions', {
        headers: requestHeaders,
        method: 'POST',
        body: JSON.stringify(payload),
    })
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    tokensUsed = res["usage"]["total_tokens"]
    let text = res['choices'][0]['message']['content']

    return text
}
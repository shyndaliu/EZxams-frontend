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
        return [res.statusText, res.status];
    }

    const response = await res.json()
    const text = response.choices[0].text;
    const token = response.usage.total_tokens;
    console.log(text, token);

    return [token, text]
}
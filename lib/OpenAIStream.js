import { fetchUpdateBalance } from '@/app/api/auth/[...nextauth]/testroute'
import {
  createParser,
} from 'eventsource-parser'

export async function OpenAIStream(payload, email) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0
  let tokensUsed = 0

  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  tokensUsed += countTokensInMessages(payload.messages);

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            console.log('DONE')
            fetchUpdateBalance(email, tokensUsed)
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
            tokensUsed += countTokens(text);
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })
  return stream
}

function countTokens(text) {
  // Matches whitespaces, special characters, and Unicode characters
  const regex = /\s+|[^a-zA-Z0-9\s]+|[\u0080-\uFFFF]/g;
  const tokens = text.trim().split(regex);
  return tokens.length;
}
function countTokensInMessages(messages) {
  let tokens = 0;
  for (const message of messages) {
    tokens += countTokens(message.role) + countTokens(message.content);
  }
  return tokens;
}

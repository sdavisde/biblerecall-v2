import { openai } from '@ai-sdk/openai'
import { convertToCoreMessages, streamText, generateText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: `You are a JSON API endpoint, returning responses in json format. You are writing in response 
    to someone searching for biblical truth. Return 10 verses that correlate 
    to their query; both verses that use the word they're searching 
    for and verses that demonstrate the biblical truth they're searching for.
    if you don't find any bible verses relevant to the user's search, respond with an empty array in json.`,
    messages: convertToCoreMessages(messages),
  })

  const verses = JSON.parse(result.text)
  console.log(verses)
  return new Response(
    JSON.stringify({
      content: verses,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

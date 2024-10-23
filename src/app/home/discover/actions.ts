import { openai } from '@ai-sdk/openai'
import { Lodash } from '@util/lodash'
import { Result } from '@util/result'
import { generateText } from 'ai'
import { z } from 'zod'

export type VerseSuggestion = z.infer<typeof verseSuggestionSchema>
const verseSuggestionSchema = z.object({
  reference: z.string(),
  text: z.string(),
})
export async function generateTextFromQuery(input: string) {
  if (Lodash.isEmpty(input)) {
    return Result.failure({ code: 'ai-verse-gen:invalid-input', message: 'Malformed input' })
  }

  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `You are a JSON API endpoint, returning responses in json format. You are writing in response 
  to someone searching for biblical truth. Return 10 verses that correlate 
  to their query; both verses that use the word they're searching 
  for and verses that demonstrate the biblical truth they're searching for.
  if you don't find any bible verses relevant to the user's search, respond with an empty array in json.
  The users query is: "${input}"`,
  })
  const trimmedResult = result.text.replace('```json', '').replace('```', '').trim()
  const verses = JSON.parse(trimmedResult).verses
  try {
    const normalizedVerses = verseSuggestionSchema.array().parse(verses)
    return Result.success(normalizedVerses)
  } catch (e) {
    return Result.failure({
      code: 'ai-verse-gen:failure',
      message: 'Verses returned by openai were in the wrong format',
    })
  }
}

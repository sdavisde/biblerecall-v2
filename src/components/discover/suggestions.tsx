import { generateTextFromQuery } from './actions'
import { VerseSuggestion } from './VerseSuggestion'

type SuggestionsProps = {
  query: string
}
export const Suggestions = async ({ query }: SuggestionsProps) => {
  const text = await generateTextFromQuery(query)

  if (!text.hasValue) {
    console.error(text.error)
    return <p>Sorry! Something went wrong finding matching verses for {query}</p>
  }

  return text.value.map((verse) => (
    <VerseSuggestion
      key={verse.reference}
      verse={verse}
    />
  ))
}

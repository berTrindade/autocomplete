import { MouseEvent } from 'react'
import { TSuggestion } from '../../types'
import Suggestion from '../Suggestion'

type SuggestionListProps = {
  suggestions: TSuggestion[]
  handleSuggestionClick: (e: MouseEvent<HTMLButtonElement>) => void
  inputValue: string
  selectedSuggestionIndex: number
}

export default function SuggestionList({
  suggestions,
  handleSuggestionClick,
  inputValue,
  selectedSuggestionIndex,
}: SuggestionListProps) {
  return (
    <ul>
      {suggestions?.map((suggestion, index) => {
        return (
          <Suggestion
            value={suggestion.name}
            key={suggestion.id}
            inputValue={inputValue}
            className={`item ${
              selectedSuggestionIndex === index ? 'selected' : ''
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
          />
        )
      })}
    </ul>
  )
}

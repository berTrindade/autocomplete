type SuggestionProps = {
  value: string
  inputValue: string
}

const highlightMatchedText = (suggestion: string, query: string) => {
  const index = suggestion.toLowerCase().indexOf(query.toLowerCase())

  const start = suggestion?.substring(0, index)
  const matched = suggestion?.substring(index, index + query?.length)
  const end = suggestion?.substring(index + query?.length)

  return (
    <p>
      {start}
      <span style={{ backgroundColor: '#FFFF00' }}>{matched}</span>
      {end}
    </p>
  )
}

export default function Suggestion({
  value,
  inputValue,
  ...rest
}: SuggestionProps) {
  return <li {...rest}>{highlightMatchedText(value, inputValue)}</li>
}

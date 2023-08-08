import {
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
} from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useDebounce } from '../../hooks/useDebouce'
import SuggestionList from '../SuggestionList'
import Input from '../Input'
import { TSuggestion } from '../../types'

const QUERY_MIN_LENGTH = 3

export default function AutoComplete() {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([])
  const [selectedSuggestion, setSelectedSuggestion] = useState('')
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1)
  const inputSearchRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce<string>(inputValue, 1000)

  const { data, loading } = useFetch<TSuggestion[]>({
    url: `${import.meta.env.VITE_API_URL}/search?q=${debouncedValue}`,
    start: debouncedValue.length >= QUERY_MIN_LENGTH,
  })

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (inputValue === '') setSuggestions([])
  }, [inputValue])

  function handleClearInput() {
    setInputValue('')
    setSelectedSuggestion('')
    setSelectedSuggestionIndex(0)
    setSuggestions([])
  }

  useEffect(() => setSuggestions(data), [data])

  function handleOnFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  const handleSuggestionClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedOnSuggestion: HTMLButtonElement = e.currentTarget

    setInputValue(clickedOnSuggestion.name)
    setSelectedSuggestion(clickedOnSuggestion.name)
    setSuggestions([])
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === -1 ? suggestions.length - 1 : prevIndex - 1,
      )
    } else if (event.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? -1 : prevIndex + 1,
      )
    } else if (event.key === 'Enter') {
      if (selectedSuggestionIndex !== -1) {
        const selectedSuggestion = suggestions[selectedSuggestionIndex]
        setInputValue(selectedSuggestion.name)
        setSelectedSuggestion(selectedSuggestion.name)
        setSuggestions([])
      }
    }
  }

  const showNoOptionsFound =
    !suggestions?.length && inputValue.length && !selectedSuggestion.length

  return (
    <section>
      <div className="container">
        <Input
          placeholder="Type to search"
          onChange={handleOnFilterChange}
          ref={inputSearchRef}
          onKeyDown={handleKeyDown}
          value={inputValue}
          handleOnClear={handleClearInput}
          hasClearIcon
        />
        {(suggestions?.length > 0 || !!showNoOptionsFound) && (
          <span className="separator" />
        )}
        {loading ? (
          <div className="icon-container">
            <i className="loader"></i>
          </div>
        ) : showNoOptionsFound ? (
          <div className="loading">
            <p>No suggestions found!</p>
          </div>
        ) : (
          suggestions?.length > 0 && (
            <SuggestionList
              selectedSuggestionIndex={selectedSuggestionIndex}
              inputValue={inputValue}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )
        )}
      </div>
    </section>
  )
}

import { ChangeEvent, MouseEvent, InputHTMLAttributes, forwardRef } from 'react'
import { ClearIcon } from '../ClearIcon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  handleOnClear: (e: MouseEvent<HTMLButtonElement>) => void
  hasClearIcon: boolean
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { value, onChange, placeholder, handleOnClear, hasClearIcon, ...rest },
  ref,
) => {
  const showClearButtonIcon = hasClearIcon && value

  return (
    <div className="inputContainer">
      <input
        aria-label="Search"
        autoComplete="off"
        name="search"
        ref={ref}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {showClearButtonIcon && (
        <button
          aria-label="Clear"
          title="Clear"
          className="clear-btn"
          onClick={handleOnClear}
        >
          <ClearIcon aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default forwardRef(Input)

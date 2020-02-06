import { useState } from 'react'

const useInput = initializer => {
  const [inputValue, setInput] = useState(initializer || '')
  const onChange = e => {
    setInput(e.target.value)
  }

  return [inputValue, onChange]
}

export default useInput

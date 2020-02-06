import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import useInput from '../functions/useInput'

const SearchBar = props => {
  const [didSearch, doSearch] = useState(false)
  const [inputValue, onChange] = useInput('')

  useEffect(() => {
    doSearch(false)
  }, [didSearch])

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      doSearch(true)
    }
  }
  const handleClick = () => {
    doSearch(true)
  }

  if (didSearch) {
    return <Redirect to={'/search/' + inputValue} />
  }

  return (
    <div className='ui fluid action input'>
      <input type='text' placeholder='Search...' onKeyPress={handleEnterKey} value={inputValue} onChange={onChange} />
      <div className='ui teal button' onClick={handleClick}>Search</div>
    </div>
  )
}

export default SearchBar

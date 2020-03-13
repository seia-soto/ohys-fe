import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import useInput from '../functions/useInput'
import store from '../structures/store'
import translations from '../translations'

const SearchBar = props => {
  const [didSearch, doSearch] = useState(false)
  const [inputValue, onChange] = useInput('')
  const { language } = store.get()
  const translation = translations[language]

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
      <input type='text' placeholder={translation.app.searchBar.inline} onKeyPress={handleEnterKey} value={inputValue} onChange={onChange} />
      <div className='ui teal button' onClick={handleClick}>{translation.app.searchBar.button}</div>
    </div>
  )
}

export default SearchBar

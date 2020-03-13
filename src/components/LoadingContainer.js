import React from 'react'

import store from '../structures/store'
import translations from '../translations'

const LoadingContainer = props => {
  const { language } = store.get()
  const translation = translations[language]

  return (
    <div className='ui center aligned container'>
      <h3 className='ui header'>{translation.api.loading}</h3>
      <p>{translation.api.ifLoadTooLong}</p>
    </div>
  )
}

export default LoadingContainer

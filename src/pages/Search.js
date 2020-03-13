import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import FormData from 'form-data'
import fetch from 'node-fetch'
import util from 'util'

import config from '../config'
import store from '../structures/store'
import translations from '../translations'

import Item from '../components/Item'
import LoadingContainer from '../components/LoadingContainer'

const Search = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])
  const { language } = store.get()
  const translation = translations[language]

  useEffect(() => {
    setLoading(true)

    const form = new FormData()

    form.append('scope', 'series')
    form.append('keyword', params.keyword)

    fetch(config.backend + '/search', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(items => {
        updateData(items)
        setLoading(false)
      })
  }, [params.keyword])

  if (isLoading) {
    return <LoadingContainer />
  }

  return (
    <>
      <h1 className='ui header'>
        {translation.search.title}
        <div className='sub header'>
          {util.format(translation.search.description, params.keyword)}
        </div>
      </h1>

      <div className='ui relaxed divided list'>
        {
          data.map((item, key) => (
            <Item
              key={key}
              link={item.link}
              series={item.series}
              episode={item.episode}
              resolution={item.resolution}
              broadcaster={item.broadcaster}
              videoFormat={item.videoFormat}
              audioFormat={item.audioFormat}
            />
          ))
        }
      </div>
    </>
  )
}

export default Search

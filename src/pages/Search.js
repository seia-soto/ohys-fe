import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import FormData from 'form-data'
import fetch from 'node-fetch'

import config from '../config'

import Item from '../components/Item'

const Search = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])

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
    return (
      <div className='ui center aligned container'>
        <h3 className='ui header'>Awaiting API...</h3>
        <p>If the application doesn't load too long, try refreshing the webpage.</p>
      </div>
    )
  }

  return (
    <>
      <h1 className='ui header'>
        Search
        <div className='sub header'>
          Search result of '{params.keyword}'.
        </div>
      </h1>

      <div className='ui relaxed divided list'>
        {
          data.map((item, key) => <Item
            key={key}
            link={item.link}
            series={item.series}
            episode={item.episode}
            resolution={item.resolution}
            broadcaster={item.broadcaster}
            videoFormat={item.videoFormat}
            audioFormat={item.audioFormat}
          />)
        }
      </div>
    </>
  )
}

export default Search

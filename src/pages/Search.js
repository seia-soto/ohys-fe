import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import FormData from 'form-data'
import fetch from 'node-fetch'

const Search = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])

  useEffect(() => {
    window.scrollTo(0, 250)

    const form = new FormData()

    form.append('scope', 'series')
    form.append('keyword', params.keyword)

    fetch('https://api-v0.ohys.seia.io/search', {
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
          data.map(item => (
            <div className='item' key={item.id}>
              <i className='file icon'/>
              <div className='content'>
                <a className='header' href={item.link}>{item.series}</a>
                <div className='description'>
                  {item.episode ? 'Episode ' + item.episode : 'Single episode'}, {item.resolution} {item.broadcaster} {item.videoFormat} {item.audioFormat}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Search

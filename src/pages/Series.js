import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import FormData from 'form-data'
import fetch from 'node-fetch'

import config from '../config'

import Item from '../components/Item'

const Series = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])
  const [meta, updateMeta] = useState({})

  useEffect(() => {
    setLoading(true)

    const form = new FormData()

    form.append('series', params.series)

    fetch(config.backend + '/series', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(meta => {
        updateMeta(meta[0] || {})

        // NOTE: Get episodes.
        const searchForm = new FormData()

        searchForm.append('scope', 'series')
        searchForm.append('keyword', params.series)

        fetch(config.backend + '/search', {
          method: 'POST',
          body: searchForm
        })
          .then(res => res.json())
          .then(items => {
            updateData(items)
            setLoading(false)
          })
      })
  }, [params.series])

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
        {params.series}
        <div className='sub header'>
          {meta.titleNative}
        </div>
      </h1>

      <div className='ui stackable two column grid'>
        <div className='four wide column'>
          <img className='ui basic fluid rounded image' src={meta.coverImageURL} />

          <h3 className='ui header'>
            Status
            <div className='sub header'>
              {meta.status}
            </div>
          </h3>
          <h3 className='ui header'>
            Description
            <div className='sub header'>
              {meta.description}
            </div>
          </h3>
        </div>
        <div className='twelve wide column'>
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
        </div>
      </div>
    </>
  )
}

export default Series

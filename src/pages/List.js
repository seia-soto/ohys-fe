import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import fetch from 'node-fetch'

import config from '../config'

import Item from '../components/Item'

const Home = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])
  const [page, setPage] = useState(Number(params.page) || 1)

  const previous = () => {
    setPage(page - 1)
  }
  const next = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    setLoading(true)

    if (isNaN(page) || page <= 0) {
      setPage(1)
    }

    fetch(config.backend + '/latest?page=' + page)
      .then(res => res.json())
      .then(items => {
        updateData(items)
        setLoading(false)
      })
  }, [page])

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
        Latest
        <div className='sub header'>
          Page {page}
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
      <div className='ui center aligned basic segment'>
        <Link to={'/page/' + (page - 1)}>
          <div className='ui secondary button' onClick={previous}>Previous</div>
        </Link>
        <Link to={'/page/' + (page + 1)}>
          <div className='ui primary button' onClick={next}>Next</div>
        </Link>
      </div>
    </>
  )
}

export default Home

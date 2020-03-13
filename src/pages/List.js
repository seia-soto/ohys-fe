import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import fetch from 'node-fetch'

import config from '../config'
import store from '../structures/store'
import translations from '../translations'

import Item from '../components/Item'
import LoadingContainer from '../components/LoadingContainer'

const Home = props => {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, updateData] = useState([])
  const [page, setPage] = useState(Number(params.page) || 1)
  const { language } = store.get()
  const translation = translations[language]

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
    return <LoadingContainer />
  }

  return (
    <>
      <h1 className='ui header'>
        {translation.list.latest}
        <div className='sub header'>
          {translation.list.page} {page}
        </div>
      </h1>

      <div className='ui relaxed divided list'>
        {
          data.map((item, key) => <Item
            key={key}
            original={item.original}
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
          <div className='ui secondary button' onClick={previous}>{translation.list.previous}</div>
        </Link>
        <Link to={'/page/' + (page + 1)}>
          <div className='ui primary button' onClick={next}>{translation.list.next}</div>
        </Link>
      </div>
    </>
  )
}

export default Home

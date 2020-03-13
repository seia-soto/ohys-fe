import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import store from '../structures/store'
import translations from '../translations'

const Item = props => {
  const { language } = store.get()
  const translation = translations[language]

  let title = props.original
  let description = translation.item.parsingFailed

  if (props.series.length) {
    title = props.series + (props.episode >= 0 ? ` - ${props.episode}` : '')
    description = (
      <>
        {props.resolution} {props.broadcaster} {props.videoFormat} {props.audioFormat}
        <br />
        <br />
        <Link to={'/series/' + props.series} ><a>{translation.item.viewSeries}</a></Link>
      </>
    )
  }

  return (
    <div className='item'>
      <i className='file icon'/>
      <div className='content'>
        <a className='header' href={props.link}>
          {title}
        </a>
        <div className='description'>
          {description}
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  original: PropTypes.string,
  link: PropTypes.string,
  series: PropTypes.string,
  episode: PropTypes.number,
  resolution: PropTypes.string,
  broadcaster: PropTypes.string,
  videoFormat: PropTypes.string,
  audioFormat: PropTypes.string
}

export default Item

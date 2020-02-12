import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Item = props => {
  return (
    <div className='item'>
      <i className='file icon'/>
      <div className='content'>
        <a className='header' href={props.link}>{props.series} - {props.episode >= 0 ? 'Episode ' + props.episode : 'Single episode or package'}</a>
        <div className='description'>
          {props.resolution} {props.broadcaster} {props.videoFormat} {props.audioFormat}
          <br />
          <Link to={'/series/' + props.series} ><a>view series</a></Link>
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  link: PropTypes.string,
  series: PropTypes.string,
  episode: PropTypes.number,
  resolution: PropTypes.string,
  broadcaster: PropTypes.string,
  videoFormat: PropTypes.string,
  audioFormat: PropTypes.string
}

export default Item

import * as React from 'react'
import * as PropTypes from 'prop-types'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'

import ImageHeader from './ImageHeader'

const AiringSoon = props => {
  // NOTE: destructures;
  const { useState, useEffect } = React
  const { data } = props

  dayjs.extend(relativeTime)
  dayjs.extend(utc)
  dayjs.extend(quarterOfYear)

  const current = dayjs()

  const [next, setNext] = useState()

  useEffect(() => {
    // NOTE: calculdate data based on schedule data;
    if (!data) return

    setNext()

    let next = data[0]

    for (let i = 1 /* skip first item from array */, l = data.length; i < l; i++) {
      const item = data[i]

      if (current.diff(item.schedule.time) > current.diff(next.schedule.time)) {
        next = item
      }
    }

    if (next) {
      setNext(next)
    }
  }, [data])

  if (!data || !next) return null

  return (
    <ImageHeader
      backdropImage={next.backdropImage}
      posterImage={next.posterImage}
      status='Airing Soon'
      title={`${next.schedule.time.format('HH:mm')} ${(next.translation.name || next.name)}`}
      titleLink={`/anime/${next.id}`}
      description={next.translation.overview}
    />
  )
}

AiringSoon.propTypes = {
  data: PropTypes.any
}

export default AiringSoon

import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Container,
  Heading
} from '@chakra-ui/react'

import ImageHeader from './ImageHeader'
import Loading from '../components/Loading'

import api from '../api'

const AiringSoon = props => {
  // NOTE: destructures;
  const { useState, useEffect } = React

  dayjs.extend(relativeTime)
  dayjs.extend(utc)
  dayjs.extend(quarterOfYear)

  const current = dayjs()

  // NOTE: hooks;
  const { data } = useSWR(
    api + '/api/v1/schedules?' +
    qs.stringify({
      year: current.year(),
      quarter: current.quarter(),
      language: 'ko'
    })
  )
  const [next, setNext] = useState()

  useEffect(() => {
    // NOTE: calculdate data based on schedule data;
    if (!data) return

    setNext()

    let next

    for (let i = 0, l = data.length; i < l; i++) {
      const item = data[i]

      let day = Number(item.airingDay)

      if (!item.airingTime || day > 6) continue

      let [hour, minute] = item.airingTime.split(':')

      hour = Number(hour)
      minute = Number(minute)

      if (minute >= 60) {
        minute -= 60
        hour += 1
      }
      if (hour >= 24) {
        hour -= 24
        day += 1
      }

      day += 1

      if (day > 6) {
        day = 0
      }

      const airing = dayjs()
        .day(day)
        .hour(hour)
        .minute(minute)
        .utcOffset(9, true)

      if (!next) {
        next = {
          data: item,
          time: airing
        }
      }

      if (current.diff(airing.time) < current.diff(next.time)) {
        next = {
          data: item,
          time: airing
        }
      }
    }

    if (next) {
      setNext(next)
    }
  }, [data])

  if (!data || !next) {
    return (
      <Container
        maxW='900px'
        style={{
          paddingTop: '16px'
        }}
      >
        <Loading />
      </Container>
    )
  }

  return (
    <>
      <ImageHeader
        backdropImage={next.data.backdropImage}
        posterImage={next.data.posterImage}
        status='Airing Soon'
        title={`${next.time.format('HH:mm')} ${(next.data.translation.name || next.data.name)}`}
        titleLink={`/anime/${next.data.id}`}
        description={next.data.translation.overview}
      />
      <Container
        maxW='900px'
        paddingTop='16px'
      >
        <Heading>새롭게 시작하는 2021년 1분기</Heading>
        <Heading size='2xl'>애니메이션을 만나보세요!</Heading>
      </Container>
    </>
  )
}

export default AiringSoon

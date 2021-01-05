import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Container,
  List,
  ListItem,
  ListIcon,
  Link,
  Heading
} from '@chakra-ui/react'
import {
  DownloadIcon
} from '@chakra-ui/icons'

import ImageHeader from '../presets/ImageHeader'
import Loading from '../components/Loading'

import api from '../api'

const Anime = props => {
  const { language } = useSelector(state => state.settings)
  const { id } = useParams()
  const { data } = useSWR(
    api + '/api/v1/anime?' +
    qs.stringify({
      id,
      language
    })
  )

  dayjs.extend(relativeTime)

  if (!data) return <Loading />

  return (
    <>
      <ImageHeader
        backdropImage={data.backdropImage}
        posterImage={data.posterImage}
        status={
          data.year
            ? `${data.year}@${data.quarter}`
            : ''
        }
        title={(data.translation.name || data.name)}
        titleLink={`/anime/${data.id}`}
        description={data.translation.overview}
        maxDescriptionSize={0}
      >
        <List spacing={2}>
          <ListItem>
            <Heading size='sm'>
              Network
            </Heading>
            {data.network}
          </ListItem>
          <ListItem>
            <Heading size='sm'>
              Season
            </Heading>
            {data.year}@{data.quarter}
          </ListItem>
          <ListItem>
            <Heading size='sm'>
              Status
            </Heading>
            {data.status}
          </ListItem>
          <ListItem>
            <Heading size='sm'>
              Updated at
            </Heading>
            {dayjs(data.updatedAt).fromNow()}
          </ListItem>
        </List>
      </ImageHeader>
      <Container maxW='900px'>
        <Heading size='lg' paddingTop='16px'>
          Episodes
        </Heading>
        <List spacing={2} paddingTop='8px'>
          {
            data.episodes.map((episode, key) => {
              const episodeNumber = episode.number === -1
                ? `${episode.resolution.split('x')[1]}P ALL`
                : ' - ' + episode.number

              return (
                <ListItem key={key}>
                  <ListIcon as={DownloadIcon} />
                  <Link href={'https://eu.ohys.net/t/disk/' + episode.filename}>
                    {data.name} {episodeNumber} ({episode.resolution}p)
                  </Link>
                </ListItem>
              )
            })
          }
        </List>
      </Container>
    </>
  )
}

export default Anime

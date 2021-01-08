import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import fetch from 'unfetch'
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
  const [mirrorData, setMirrorData] = React.useState()

  dayjs.extend(relativeTime)

  React.useEffect(() => {
    if (!data) return

    fetch('https://api.cryental.dev/anime?q=' + data.scheduleName)
      .then(res => res.json())
      .then(json => setMirrorData(json))
  }, [data])

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
        maxDescriptionSize={450}
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
        <Heading size='md' paddingTop='16px'>
          Episodes
        </Heading>
        <List spacing={2} paddingTop='8px'>
          {
            data.episodes.map((episode, key) => {
              return (
                <ListItem key={key}>
                  <ListIcon as={DownloadIcon} />
                  <Link href={'https://eu.ohys.net/t/disk/' + episode.filename}>
                    {episode.filename}
                  </Link>
                </ListItem>
              )
            })
          }
        </List>
        <Heading size='md' paddingTop='16px'>
          Mirror
        </Heading>
        <List spacing={2} paddingTop='8px'>
          {
            !mirrorData && <Loading />
          }
          {
            mirrorData && mirrorData.map((file, key) => {
              return (
                <ListItem key={key}>
                  <ListIcon as={DownloadIcon} />
                  <Link href={'https://api.cryental.dev/anime/download?proper=magnet&id=' + file.id}>
                    {file.torrentName}
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

import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import {
  Box,
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  Spacer
} from '@chakra-ui/react'
import {
  Redirect,
  useParams
} from 'react-router-dom'

import ImageHeader from '../presets/ImageHeader'
import Loading from '../components/Loading'
import PageNavigator from '../components/PageNavigator'

import api from '../api'

const Feeds = props => {
  const { page } = useParams()

  if (!page) return null

  const isProperPageNumber =
    (page >= 1) ||
    (!isNaN(page))

  if (!isProperPageNumber) return <Redirect to='/feeds/1' />

  const { data } = useSWR(
    api + '/api/v1/feed?' +
    qs.stringify({
      language: 'ko',
      page: Number(page) - 1
    })
  )

  if (!data) return <Loading />

  return (
    <Container
      maxW='900px'
      style={{
        paddingTop: '16px'
      }}
    >
      <Flex
        style={{
          padding: '14px'
        }}
      >
        <Box>
          <Heading>
            Feeds: {page}
          </Heading>
          <Badge>Live</Badge>
        </Box>
        <Spacer />
        <PageNavigator
          previousText='Previous'
          nextText='Next'
          min={1}
          current={page}
          end={data.episodes.length <= 35}
          previousLink={`/feeds/${Number(page) - 1}`}
          nextLink={`/feeds/${Number(page) + 1}`}
        />
      </Flex>
      {
        data.episodes.map((episode, key) => {
          const anime = data.animes[episode.animeId] || { translation: {} }
          const episodeNumber = episode.number === -1
            ? ''
            : ' - ' + episode.number

          return (
            <ImageHeader
              key={key}
              posterImage={anime.posterImage}
              status={episode.resolution}
              title={`${(anime.translation.name || anime.name || episode.filename)} ${episodeNumber}`}
              titleLink={
                anime.id
                  ? `/anime/${anime.id}`
                  : 'https://eu.ohys.net/t/disk/' + episode.filename
              }
              description={anime.translation.overview}
              maxDescriptionSize={125}
              maxImageHeight={125}
              padding='5px'
            >
              <Button
                onClick={() => {
                  window.location.href = 'https://eu.ohys.net/t/disk/' + episode.filename
                }}
              >
                다운로드
              </Button>
            </ImageHeader>
          )
        })
      }
      <Flex
        style={{
          padding: '14px'
        }}
      >
        <Spacer />
        <PageNavigator
          previousText='Previous'
          nextText='Next'
          min={1}
          current={page}
          end={data.episodes.length <= 35}
          previousLink={`/feeds/${Number(page) - 1}`}
          nextLink={`/feeds/${Number(page) + 1}`}
        />
      </Flex>
    </Container>
  )
}

export default Feeds

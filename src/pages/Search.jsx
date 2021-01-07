import * as React from 'react'
import fetch from 'unfetch'
import qs from 'qs'
import { useSelector } from 'react-redux'
import {
  Box,
  Container,
  Input,
  InputGroup,
  Heading
} from '@chakra-ui/react'
import {
  useParams
} from 'react-router-dom'

import ImageHeader from '../presets/ImageHeader'
import Loading from '../components/Loading'

import api from '../api'

const Search = props => {
  const { useState, useEffect } = React

  const { language } = useSelector(state => state.settings)
  const { keyword: keywordFromURL } = useParams()
  const [keyword, setKeyword] = useState(keywordFromURL || '')
  const [data, setData] = useState()

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        api + '/api/v1/search?' +
        qs.stringify({
          language,
          keyword,
          compact: 1
        })
      )
      const json = await res.json()

      setData(json)
    }

    if (keyword) getData()
  }, [])

  return (
    <Container
      maxW='900px'
      paddingTop='16px'
    >
      <Heading>
        Search
      </Heading>
      <InputGroup paddingTop='16px'>
        <Input
          type='text'
          placeholder='Put your keyword to search here'
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter' && keyword.length) {
              window.location.href = '/search/' + keyword
            }
          }}
        />
      </InputGroup>
      {
        !data && keywordFromURL && <Loading />
      }
      {
        data && (
          <Box paddingTop='16px'>
            {
              data.map((anime, key) => {
                return (
                  <ImageHeader
                    key={key}
                    posterImage={anime.posterImage}
                    status={anime.scheduleName}
                    title={(anime.translation.name || anime.name)}
                    titleLink={`/anime/${anime.id}`}
                    description={anime.translation.overview}
                    maxDescriptionSize={125}
                    maxImageHeight={125}
                    padding='5px'
                  />
                )
              })
            }
          </Box>
        )
      }
    </Container>
  )
}

export default Search

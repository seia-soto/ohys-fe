import * as React from 'react'
import fetch from 'unfetch'
import qs from 'qs'
import { useSelector } from 'react-redux'
import {
  Box,
  Badge,
  Container,
  Input,
  InputGroup,
  Link,
  Heading,
  Text
} from '@chakra-ui/react'
import {
  Link as RouterLink,
  useParams
} from 'react-router-dom'

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
      <Heading size='md'>
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
          <Box>
            {
              data.map((anime, key) => {
                if (!anime.episodes) return null

                return (
                  <Box key={key} paddingTop='22px'>
                    <Text
                      fontWeight='bold'
                      textTransform='uppercase'
                      fontSize='sm'
                      letterSpacing='wide'
                    >
                      {anime.scheduleName}
                    </Text>
                    <Heading size='md'>
                      <Link as={RouterLink} to={`/anime/${anime.id}`} color='blue.500'>
                        {(anime.translation.name || anime.name) + ' '}
                        <Badge>{anime.episodes} Episodes</Badge>
                      </Link>
                    </Heading>
                    <Text>
                      {
                        anime.translation.overview.slice(0, 125) +
                        `${anime.translation.overview.length > 125 ? '...' : ''}`
                      }
                    </Text>
                  </Box>
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

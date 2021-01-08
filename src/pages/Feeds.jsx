import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import { useSelector } from 'react-redux'
import {
  Box,
  Badge,
  Button,
  Link,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  Spacer,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  List,
  ListItem,
  IconButton
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import {
  Link as RouterLink,
  Redirect,
  useParams
} from 'react-router-dom'

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

  const { language } = useSelector(state => state.settings)
  const { data } = useSWR(
    api + '/api/v1/feed?' +
    qs.stringify({
      language,
      page: Number(page) - 1
    })
  )

  if (!data) return <Loading />

  return (
    <Container
      maxW='900px'
      paddingTop='14px'
    >
      <Flex paddingTop='14px'>
        <Box>
          <Heading size='md'>
            Feeds: {page}
          </Heading>
          <Badge>Live</Badge>
        </Box>
        <Spacer />
        <PageNavigator
          previousText='Prev'
          nextText='Next'
          min={1}
          current={page}
          end={data.episodes.length <= 35}
          previousLink={`/feeds/${Number(page) - 1}`}
          nextLink={`/feeds/${Number(page) + 1}`}
        />
      </Flex>
      <List>
        {
          data.episodes.map((episode, key) => {
            const anime = data.animes[episode.animeId] || { translation: {} }
            const episodeNumber = episode.number === -1
              ? `${episode.resolution.split('x')[1]}P ALL`
              : ' - ' + episode.number

            return (
              <Box key={key}>
                <ListItem
                  display={{
                    md: 'flex'
                  }}
                  paddingTop='8px'
                >
                  <Box display='inline-block'>
                    <Heading size='sm'>
                      <Link href={'https://eu.ohys.net/t/disk/' + episode.filename} color='blue.500'>
                        {anime.translation.name || anime.name || episode.filename} {episodeNumber}
                      </Link>
                    </Heading>
                    <Text>
                      {anime.scheduleName || anime.name} {episodeNumber} ({episode.resolution})
                    </Text>
                  </Box>
                  <Spacer
                    display={['none', 'block']}
                  />
                  <Stack
                    as={Flex}
                    flexShrink={0}
                    spacing={2}
                    direction='row'
                    paddingTop='4px'
                  >
                    <Button
                      as={RouterLink}
                      size='sm'
                      to={'/anime/' + anime.id}
                      leftIcon={<ExternalLinkIcon />}
                    >
                      Series
                    </Button>
                    <Menu placement='bottom'>
                      <MenuButton as={IconButton} icon={<ChevronDownIcon />} size='sm' />
                      <MenuList>
                        <MenuItem
                          as={Link}
                          href={'https://nyaa.si/?u=ohys&q=' + anime.scheduleName}
                        >
                          View on Nyaa.si
                        </MenuItem>
                        <MenuItem
                          as={Link}
                          href={'https://cryental.dev/services/anime/?search=' + anime.scheduleName}
                        >
                          View on mirror (Cryental)
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Stack>
                </ListItem>
                <Divider marginTop='8px' />
              </Box>
            )
          })
        }
      </List>
      <Flex
        style={{
          padding: '14px'
        }}
      >
        <Spacer />
        <PageNavigator
          previousText='Prev'
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

import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {
  Box,
  Container,
  Heading,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'

import AiringSoon from '../presets/AiringSoon'
import ImageHeader from '../presets/ImageHeader'
import Loading from '../components/Loading'

import normalizeAnimeTimetables from '../functions/normalizeAnimeTimetables'

import api from '../api'

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Specials'
]

const Schedules = props => {
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
  const [schedules, setSchedule] = React.useState()

  React.useEffect(() => {
    if (!data) return

    setSchedule(normalizeAnimeTimetables(data))
  }, [data])

  if (!data || !schedules) {
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
    <Box>
      <Container
        maxW='900px'
        paddingTop='16px'
      >
        {
          current.quarter() === 1 && (
            <>
              <Heading>
                Uprising first quarter
              </Heading>
              <Text>
                Meet uprising new animes in {current.year()}
              </Text>
            </>
          )
        }
      </Container>
      <Box paddingTop='16px'>
        <AiringSoon data={schedules} />
      </Box>
      <Container
        maxW='900px'
        paddingTop='16px'
      >
        {
          data && (
            <Box
              paddingTop='16px'
            >
              <Tabs variant='soft-rounded'>
                <TabList overflowX='auto'>
                  {
                    days.map((day, key) => {
                      return (
                        <Tab key={key}>
                          {day}
                        </Tab>
                      )
                    })
                  }
                </TabList>
                <TabPanels>
                  {
                    days.map((day, idx) => {
                      return (
                        <TabPanel key={`${day}`}>
                          {
                            schedules
                              .filter(anime => {
                                const rules =
                                  (anime.schedule) &&
                                  (anime.schedule.day === idx)

                                return rules
                              })
                              .map((anime, key) => {
                                return (
                                  <ImageHeader
                                    key={`${day}.${idx}`}
                                    posterImage={anime.posterImage}
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
                        </TabPanel>
                      )
                    })
                  }
                </TabPanels>
              </Tabs>
            </Box>
          )
        }
      </Container>
    </Box>
  )
}

export default Schedules

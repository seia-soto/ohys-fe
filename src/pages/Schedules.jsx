import * as React from 'react'
import useSWR from 'swr'
import qs from 'qs'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useSelector } from 'react-redux'
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
  const year = current.year()
  const quarter = current.quarter()
  const day = current.day()

  // NOTE: hooks;
  const { language } = useSelector(state => state.settings)
  const { data } = useSWR(
    api + '/api/v1/schedules?' +
    qs.stringify({
      year,
      quarter,
      language
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
          quarter === 1 && (
            <>
              <Heading>
                Upcoming first quarter
              </Heading>
              <Text>
                Meet upcoming new animes in {year}@{quarter}
              </Text>
            </>
          )
        }
        {
          quarter === 2 && (
            <>
              <Heading>
                Continue with second quarter
              </Heading>
              <Text>
                Meet new animes waiting for you in {year}@{quarter}
              </Text>
            </>
          )
        }
        {
          quarter === 3 && (
            <>
              <Heading>
                This is not actual third place
              </Heading>
              <Text>
                Meet uplifting new animes just like first ones in {year}@{quarter}
              </Text>
            </>
          )
        }
        {
          quarter === 4 && (
            <>
              <Heading>
                Ending with you even in last quarter
              </Heading>
              <Text>
                Meet new animes and stay the end of the year with them in {year}@{quarter}
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
              <Tabs variant='soft-rounded' defaultIndex={day}>
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
                        <TabPanel key={day} isLazy>
                          {
                            schedules
                              .filter(anime => {
                                const rules =
                                  (anime.schedule) &&
                                  (anime.schedule.day === idx)

                                return rules
                              })
                              .sort((prev, next) => {
                                if (prev.schedule.hour < next.schedule.hour) {
                                  return -1
                                }
                                if (prev.schedule.hour > next.schedule.hour) {
                                  return 1
                                }

                                // NOTE: get mintues;
                                if (prev.schedule.minute < next.schedule.minute) {
                                  return -1
                                }
                                if (prev.schedule.minute > next.schedule.minute) {
                                  return 1
                                }

                                return 0
                              })
                              .map((anime, key) => {
                                return (
                                  <ImageHeader
                                    key={`${day}.${idx}.${anime.name}`}
                                    posterImage={anime.posterImage}
                                    title={`${anime.schedule.time.format('HH:mm')} ${(anime.translation.name || anime.name)}`}
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

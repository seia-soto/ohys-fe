import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Code,
  Container,
  Link,
  Stack,
  Heading,
  Text,
  Input,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'

import BoxItems from '../components/BoxItems'

import * as settingsActions from '../actions/settings'

const Main = props => {
  const { language } = useSelector(state => state.settings)
  const dispatch = useDispatch()
  const [languageCode, setLanguageCode] = React.useState(language)

  return (
    <Container
      maxW='900px'
    >
      <Heading size='md' paddingTop='16px'>
        Getting start
      </Heading>
      <Stack spacing={4} paddingTop='16px'>
        <BoxItems
          link='/feeds'
          title='Feeds'
          description='Meet latest animes'
        />
        <BoxItems
          link='/schedules'
          title='Schedules'
          description='See what is being released'
        />
        <BoxItems
          link='/search'
          title='Search'
          description='Search animes from database'
        />
      </Stack>
      <Heading size='md' paddingTop='32px'>
        Settings
      </Heading>
      <Stack paddingTop='16px'>
        <Box>
          <Heading size='sm'>
            Language (anime metadata)
          </Heading>
          <Text>
            The language value should be <Link href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'>ISO 639-1 format</Link>.
            Also, if there is no translation available in your language, server will fallback with English title and description.
          </Text>
          <Box padding='8px'>
            <Input
              placeholder='en'
              value={languageCode}
              onChange={event => {
                const value = event.target.value

                setLanguageCode(value)

                if (value.length === 2) {
                  dispatch(settingsActions.setLanguage(value))
                }
              }}
              errorBorderColor='crimson'
              isInvalid={languageCode.length !== 2}
            />
            <UnorderedList paddingTop='4px'>
              <ListItem><Code>en</Code> English (English)</ListItem>
              <ListItem><Code>ko</Code> Korean (한국어)</ListItem>
              <ListItem><Code>ja</Code> Japanese (日本語)</ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Stack>
      <Heading size='md' paddingTop='32px'>
        GitHub
      </Heading>
      <Stack spacing={4} paddingTop='16px'>
        <BoxItems
          link='https://github.com/Seia-Soto/ohys-api'
          title='Seia-Soto/ohys-api'
          description='Get the source code and see what is being changed in server'
        />
        <BoxItems
          link='https://github.com/Seia-Soto/ohys-fe'
          title='Seia-Soto/ohys-fe'
          description='Get the source code and see what is being changed in website'
        />
      </Stack>
    </Container>
  )
}

export default Main

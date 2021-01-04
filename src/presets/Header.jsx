import * as React from 'react'
import {
  Box,
  Container,
  Flex,
  Spacer,
  Heading,
  IconButton,
  Link,
  useColorMode
} from '@chakra-ui/react'
import {
  SunIcon,
  MoonIcon
} from '@chakra-ui/icons'

import NavItem from '../components/NavItem'

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      as='header'
      bg={
        colorMode === 'light'
          ? 'white'
          : 'gray.900'
      }
      padding='12px'
      shadow='sm'
    >
      <Container maxW='900px'>
        <Flex align='center'>
          <Heading
            as='span'
            size='md'
          >
            <Link href='/'>
              Ohys
            </Link>
          </Heading>
          <NavItem link='/feeds'>
            Feeds
          </NavItem>
          <NavItem link='/schedules'>
            Schedules
          </NavItem>
          <Spacer />
          <Box>
            <IconButton
              icon={
                colorMode === 'light'
                  ? <MoonIcon />
                  : <SunIcon />
              }
              aria-label='Toggle color mode'
              size='sm'
              onClick={toggleColorMode}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header

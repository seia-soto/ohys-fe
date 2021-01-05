import * as React from 'react'
import {
  Container,
  Divider
} from '@chakra-ui/react'

const Footer = props => {
  return (
    <>
      <Divider marginTop='16px' />
      <Container maxW='900px' paddingTop='16px' paddingBottom='16px'>
        Copyright {new Date().getFullYear() || 2021} Seia-Soto.
        All rights reserved.
      </Container>
    </>
  )
}

export default Footer

import * as React from 'react'

import {
  Container,
  Spinner
} from '@chakra-ui/react'

const Loading = props => {
  return (
    <Container
      padding='16px'
      centerContent
    >
      <Spinner />
    </Container>
  )
}

export default Loading

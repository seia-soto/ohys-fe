import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Box,
  Link,
  Heading,
  Text
} from '@chakra-ui/react'
import {
  LinkIcon
} from '@chakra-ui/icons'
import {
  Link as RouterLink
} from 'react-router-dom'

const BoxItems = props => {
  return (
    <Box padding='16px' shadow='md' borderWidth='1px'>
      <Heading fontSize='md'>
        <Link as={RouterLink} to={props.link}>
          {props.title}
          {props.link && <LinkIcon />}
        </Link>
      </Heading>
      <Text>
        {props.description}
      </Text>
    </Box>
  )
}

BoxItems.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
}

export default BoxItems

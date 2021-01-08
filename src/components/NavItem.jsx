import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Text,
  Link
} from '@chakra-ui/react'
import {
  Link as RouterLink
} from 'react-router-dom'

const NavItem = props => {
  return (
    <Text
      as='span'
      paddingLeft='20px'
    >
      <Link as={RouterLink} to={props.link}>
        {props.children}
      </Link>
    </Text>
  )
}

NavItem.propTypes = {
  children: PropTypes.any,
  link: PropTypes.string
}

export default NavItem

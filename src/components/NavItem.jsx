import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Text,
  Link
} from '@chakra-ui/react'

const NavItem = props => {
  return (
    <Text
      as='span'
      style={{
        paddingLeft: '20px'
      }}
    >
      <Link href={props.link}>
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

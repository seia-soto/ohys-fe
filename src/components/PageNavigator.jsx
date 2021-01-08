import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Button,
  ButtonGroup
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  ArrowForwardIcon
} from '@chakra-ui/icons'
import {
  Link as RouterLink
} from 'react-router-dom'

const PageNavigator = props => {
  return (
    <ButtonGroup direction='row' spacing={2} size='sm'>
      {
        props.min < props.current && (
          <Button
            as={RouterLink}
            leftIcon={<ArrowBackIcon />}
            variant='outline'
            to={props.previousLink}
          >
            {props.previousText}
          </Button>
        )
      }
      {
        props.end && (
          <Button
            as={RouterLink}
            rightIcon={<ArrowForwardIcon />}
            variant='solid'
            to={props.nextLink}
          >
            {props.nextText}
          </Button>
        )
      }
    </ButtonGroup>
  )
}

PageNavigator.defaultProps = {
  previousText: 'Previous',
  nextText: 'Next',
  min: 1,
  current: 1,
  end: 0,
  previousLink: '',
  nextLink: ''
}
PageNavigator.propTypes = {
  previousText: PropTypes.any,
  nextText: PropTypes.any,
  min: PropTypes.number,
  current: PropTypes.number,
  end: PropTypes.number,
  previousLink: PropTypes.string,
  nextLink: PropTypes.string
}

export default PageNavigator

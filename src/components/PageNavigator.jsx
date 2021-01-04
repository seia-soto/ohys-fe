import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Button,
  Flex,
  Spacer,
  Stack
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  ArrowForwardIcon
} from '@chakra-ui/icons'

const PageNavigator = props => {
  return (
    <Flex padding='14px'>
      <Spacer />
      <Stack direction='row' spacing={4}>
        {
          props.min < props.current && (
            <Button
              leftIcon={<ArrowBackIcon />}
              variant='outline'
              onClick={() => {
                window.location.href = props.previousLink
              }}
            >
              {props.previousText}
            </Button>
          )
        }
        {
          props.end && (
            <Button
              rightIcon={<ArrowForwardIcon />}
              variant='solid'
              onClick={() => {
                window.location.href = props.nextLink
              }}
            >
              {props.nextText}
            </Button>
          )
        }
      </Stack>
    </Flex>
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

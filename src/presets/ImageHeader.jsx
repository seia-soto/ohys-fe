import * as React from 'react'
import * as PropTypes from 'prop-types'
import { css } from '@emotion/react'
import {
  Box,
  Container,
  Center,
  Heading,
  Image,
  Text,
  useColorMode
} from '@chakra-ui/react'

const ImageHeader = props => {
  // NOTE: hooks;
  const { colorMode } = useColorMode()

  const colorFilter = colorMode === 'light'
    ? 'rgba(255,255,255,0.6)'
    : 'rgba(0,0,0,0.5)'
  const background = props.backdropImage
    ? `
      background-image: linear-gradient(to right, ${colorFilter}, ${colorFilter}), url(https://image.tmdb.org/t/p/w500${props.backdropImage});
      background-position: center;
      background-size: cover;
    `
    : ''

  return (
    <Box
      css={css(background)}
    >
      <Box
        style={
          props.backdropImage
            ? { backdropFilter: 'blur(15px)' }
            : {}
        }
      >
        <Container
          maxW='900px'
          style={{
            paddingTop: props.padding,
            paddingBottom: props.padding
          }}
        >
          <Box
            p={4}
            display={{
              md: 'flex'
            }}
          >
            <Center flexShrink={0}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${props.posterImage}`}
                crossOrigin='anonymous'
                borderRadius='md'
                width={{
                  md: props.maxImageHeight
                }}
              />
            </Center>
            <Box
              mt={{
                base: 4,
                md: 0
              }}
              ml={{
                md: 6
              }}
            >
              <Text
                fontWeight='bold'
                textTransform='uppercase'
                fontSize='sm'
                letterSpacing='wide'
              >
                {props.status}
              </Text>
              <Heading size='lg'>
                {props.title}
              </Heading>
              <Text>
                {props.description.slice(0, props.maxDescriptionSize)}
                {props.description.length > props.maxDescriptionSize && '...'}
              </Text>
              <Box style={{ padding: '4px' }}>
                {props.children}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

ImageHeader.propTypes = {
  children: PropTypes.any,
  backdropImage: PropTypes.string,
  posterImage: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  maxDescriptionSize: PropTypes.number,
  maxImageHeight: PropTypes.number,
  padding: PropTypes.string
}
ImageHeader.defaultProps = {
  backdropImage: '',
  posterImage: '',
  status: '',
  title: '',
  description: '',
  maxDescriptionSize: 300,
  maxImageHeight: 250,
  padding: '16px'
}

export default ImageHeader

import * as React from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import {
  SearchIcon
} from '@chakra-ui/icons'

const Search = props => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
      >
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input type='text' placeholder='Search' />
    </InputGroup>
  )
}

export default Search

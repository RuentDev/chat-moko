import { Container, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { FC } from "react";
import { SlMagnifier } from "react-icons/sl";
interface SearchBoxProps {};

const SearchBox:FC<SearchBoxProps> = ({}) => {
  return(
    <Container width="100%" borderWidth={0}>
       <InputGroup >
        <InputLeftElement pointerEvents='none'>
          <SlMagnifier color='gray.300' />
        </InputLeftElement>
        <Input type='text' />
      </InputGroup>
    </Container>
  )
};

export default SearchBox;
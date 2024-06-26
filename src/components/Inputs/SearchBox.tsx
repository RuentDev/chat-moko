"use client"
import { Container, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
interface SearchBoxProps {};

const SearchBox = ({}: SearchBoxProps) => {

  const [input, setInput] = useState("")

  const handleResetInput = () => {
    setInput("")
  }


  return(
    <Container 
      maxW={{ 
        sm: "100%" 
      }}
      px={0} 
      py={3}
      border={0}
    >
      <Flex 
        alignItems="center" 
        justifyContent="center"
        gap={1}
      >
        <InputGroup>
          <Input 
            type='text' 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            borderBottomRightRadius={0}
          />
          <InputLeftElement pointerEvents='none'>
            <SlMagnifier color='gray.300' />
          </InputLeftElement>
          <InputRightElement>
            <IconButton 
              isRound
              size="sm"       
              padding={1}
              fontSize={10}
              aria-label={""}
              bg="transparent"
              icon={<IoCloseCircleOutline />}
              onClick={handleResetInput}
              cursor={input ? "pointer" : "default"}
              visibility={input ? "visible" : "hidden"}  
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Container>
  )
};

export default SearchBox;
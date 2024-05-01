"use client"
import { 
  Button, 
  Flex, 
  FormControl, 
  FormHelperText, 
  FormLabel, IconButton, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Stack, 
  Text 
} from '@chakra-ui/react'
import { useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

const SignupForm = () => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className='w-[500px] h-auto rounded-xl p-5 '>
      <Stack gap={3}>
        <Text letterSpacing={0.5} fontSize={"2xl"} align="center">
          SIGNUP 
        </Text>
        <Text letterSpacing={0.5} fontSize={"sm"} align="center">
          Welcome to ChatMoko MessageApp
        </Text>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='password'
            />
            <InputRightElement>
              <IconButton 
                backgroundColor="transparent"
                scale={0.5}
                _hover={{backgroundColor: "transparent"}}
                fontSize='sm'
                aria-label='show-password' 
                icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />} 
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Repeat Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='password'
            />
            <InputRightElement>
              <IconButton 
                backgroundColor="transparent"
                scale={0.5}
                _hover={{backgroundColor: "transparent"}}
                fontSize='sm'
                aria-label='show-password' 
                icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />} 
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button>
          Login
        </Button>

        <Text align="center">
          Or Signup using
        </Text>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <IconButton
            backgroundColor="transparent"
            aria-label='show-password' 
            icon={<Icon as={FaGoogle} />} 
            onClick={() => setShowPassword(!showPassword)}
          />
          <IconButton
            backgroundColor="transparent"
            aria-label='show-password' 
            icon={<Icon as={FaGithub} />} 
            onClick={() => setShowPassword(!showPassword)}
          />
          <IconButton
            backgroundColor="transparent"
            aria-label='show-password' 
            icon={<Icon as={FaFacebook} />} 
            onClick={() => setShowPassword(!showPassword)}
          />
          <IconButton
            backgroundColor="transparent"
            aria-label='show-password' 
            icon={<Icon as={FaTwitter} />} 
            onClick={() => setShowPassword(!showPassword)}
          />
        </Flex>
      </Stack>
      
      {/* <div className="login-button-container">
        <button className="login-button w-full h-auto p-2 bg-gradient-to-r from-blue-300 via-purple-500 to-blue-500 rounded-full transition-all ease-in-out duration-1000 ">
          Login
        </button>
      </div> */}
    </form>
  )
}

export default SignupForm

"use client"
import { 
  Button, 
  Flex, 
  FormControl,
  FormLabel, IconButton, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Link, 
  Stack, 
  Text 
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
const SignupForm:FC = () => {

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

        <Button 
          type="submit" 
          isLoading={false} 
        >
          Signup
        </Button>
         <Link textAlign="center" href='/auth/login'>
          Login
        </Link>

        <Text align="center">
          Or
        </Text>
        <Text align="center">
          Signup using
        </Text>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <IconButton
            backgroundColor="transparent"
            aria-label='google-signup' 
            icon={<Icon as={FaGoogle} />} 
            onClick={() => signIn("google")}
            title='Continue with Google'
            />
          <IconButton
            backgroundColor="transparent"
            aria-label='git-signup' 
            icon={<Icon as={FaGithub} />} 
            onClick={() => setShowPassword(!showPassword)}
            title='Continue with Github'
            />
          <IconButton
            backgroundColor="transparent"
            aria-label='show-signup' 
            icon={<Icon as={FaFacebook} />} 
            onClick={() => setShowPassword(!showPassword)}
            title='Continue with Facebook'
            />
          <IconButton
            backgroundColor="transparent"
            aria-label='show-signup' 
            icon={<Icon as={FaTwitter} />} 
            onClick={() => setShowPassword(!showPassword)}
            title='Continue with X'
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

"use client"
import { 
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button, 
  Flex, 
  FormControl,
  FormErrorMessage,
  FormLabel, IconButton, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Link, 
  Spinner, 
  Stack, 
  Text 
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'
import UserOperations from '@/graphql/operations/users'
import { useMutation } from '@apollo/client'
import { Field, Formik } from 'formik'
import { redirect } from 'next/navigation'

interface LoginFormProps{
  session?: Session
}

const LoginForm:FC<LoginFormProps> = (props) => {

  const [showPassword, setShowPassword] = useState(false)

  const [userLogin, {data, error, loading}] = useMutation(UserOperations.Mutation.userLogin)

  const handleUserLogin = (values: {email: string, password: string}) => {
    userLogin({
      variables: {
        username: values.email,
        password: values.password
      }
    })
  }

  const handleEmailValidation = (value: string) => {
    let error;

    if(!value){
      error = "Password is required";
    }

    if (value && value.length < 6) {
      error = "Password must contain at least 6 characters";
    }

    return error;
  }

  const handlePasswordValidation = (value: string) => {
      let error;

      if(!value){
        error = "Password is required";
      }

      if (value && value.length < 6) {
        error = "Password must contain at least 6 characters";
      }

      return error;
  }

  if(data && data.userLogin.user){
    redirect("/")
  }
   
  
  return (
    <Formik
        key={props.session?.user?.id}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleUserLogin(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className='w-[500px] h-auto rounded-xl p-5 '>
            <Stack gap={3}>
              <Text letterSpacing={0.5} fontSize={"2xl"} align="center">
                LOGIN
              </Text>
              <Text letterSpacing={0.5} fontSize={"sm"} align="center">
                Welcome Back to ChatMoko
              </Text>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel>Email</FormLabel>
                <Field 
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  validate={handleEmailValidation}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Field 
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    validate={handlePasswordValidation}
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              {data && data.userLogin.user && (
                <Alert status="success" display="flex" alignItems="center" justifyContent="center" borderRadius={5}>
                  <AlertIcon />
                  <AlertTitle>{data.userLogin.statusText}</AlertTitle>
                  {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
                </Alert>
              )}
              {data && !data.userLogin.user && (
                <Alert status="warning" display="flex" alignItems="center" justifyContent="center" borderRadius={5}>
                  <AlertIcon />
                  <AlertTitle>{data.userLogin.statusText}</AlertTitle>
                  {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
                </Alert>
              )}

              <Button 
                type='submit' 
                isLoading={loading} 
                _hover={{ }}
              >
                Login
              </Button>
              <Link textAlign="center" href='/auth/signup'>
                Signup
              </Link>

              <Text align="center">
                Or
              </Text>
              <Text align="center">
                Login using
              </Text>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <IconButton
                  backgroundColor="transparent"
                  aria-label='google-signup' 
                  icon={<Icon as={FaGoogle} />} 
                  onClick={() => signIn("google", {callbackUrl: "/"})}
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
                  title="Continue with X"
                />
              </Flex>
            </Stack>
          </form>
        )}
    </Formik>
  )
}

export default LoginForm

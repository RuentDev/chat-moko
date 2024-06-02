"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import UserOperations from "@/graphql/operations/users";
import { useMutation } from "@apollo/client";
import { Field, Formik } from "formik";
import Inputs from "@/components/Inputs";
import { signIn } from "next-auth/react";
import ChatMokoLogo from "../../../public/svgs/chatmoko-logo.svg";
import ChatMokoSmallLogo from "../../../public/svgs/chatmokosmall-logo.svg";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [userLogin, { data }] = useMutation(UserOperations.Mutation.userLogin);

  const handleUserLogin = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(!loading);

    const res = await signIn("app-login", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });

    if (res?.ok) {
      setLoading(!loading);
    }

    console.log(res);
  };

  const handleEmailValidation = (value: string) => {
    let error;

    if (!value) {
      error = "Password is required";
    }

    if (value && value.length < 6) {
      error = "Password must contain at least 6 characters";
    }

    return error;
  };

  const handlePasswordValidation = (value: string) => {
    let error;

    if (!value) {
      error = "Password is required";
    }

    if (value && value.length < 6) {
      error = "Password must contain at least 6 characters";
    }

    return error;
  };

  const logoSrc = useBreakpointValue({
    base: ChatMokoSmallLogo,
    lg: ChatMokoLogo,
  });

  return (
    <Flex
      className="log-in-container"
      width="100%"
      height="100%"
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
    >
      {/* Left side logo content */}
      <Box
        className="left-side-content"
        p="4"
        width={{ base: "100%", lg: "50%" }}
        height="100%"
        backgroundColor={{ base: "#D9D9D9", lg: "#1A202C" }}
      >
        <Box
          marginTop="20%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            className="w-[112px] lg:w-[282px]"
            src={logoSrc}
            alt="Chat Moko Logo"
          />

          <Text
            textColor={{ base: "rgba(26, 32, 44, 0.44)", lg: "#FFFFFF" }}
            marginTop={10}
            fontSize={{ base: "small", lg: "3xl" }}
          >
            Bringing People Together
          </Text>
        </Box>
      </Box>

      {/* Right side Login form content */}
      <Box
        className="right-side-content"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="4"
        width="100%"
        height="auto"
        backgroundColor="#D9D9D9"
      >
        <Formik
          key={"asdasasd"}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleUserLogin}
        >
          {({ handleSubmit, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              className="w-[500px] h-auto rounded-xl p-5 mb-80"
            >
              <Stack gap={3} align='center'>
                <Text
                  color="#1A202C"
                  letterSpacing={0.5}
                  fontSize={"2xl"}
                  fontWeight={600}
                  align="center"
                >
                  LOGIN
                </Text>
                <Text
                  color="#1A202C"
                  letterSpacing={0.5}
                  fontSize={"sm"}
                  fontWeight={400}
                  align="center"
                >
                  Welcome Back to ChatMoko
                </Text>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel color="#1A202C">Email</FormLabel>
                  <Field
                    borderColor="#1A202C"
                    backgroundColor="transparent"
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    validate={handleEmailValidation}
                  />
                  <FormErrorMessage>Email is required</FormErrorMessage>
                </FormControl>
                <Inputs.PasswordInput
                  errors={errors}
                  touched={touched}
                  handlePasswordValidation={handlePasswordValidation}
                />

                {data && data.userLogin.user && (
                  <Alert
                    status="success"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={5}
                  >
                    <AlertIcon />
                    <AlertTitle>{data.userLogin.statusText}</AlertTitle>
                  </Alert>
                )}

                {data && !data.userLogin.user && (
                  <Alert
                    status="warning"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={5}
                  >
                    <AlertIcon />
                    <AlertTitle>{data.userLogin.statusText}</AlertTitle>
                  </Alert>
                )}

                <Button
                  width="147px"
                  bg="#1A202C"
                  color="#FFFFFF"
                  type="submit"
                  isLoading={loading}
                  _hover={{}}
                >
                  Login
                </Button>

                <Text color="#1A202C" align="center">
                  or
                </Text>

                <Flex alignItems={"center"} justifyContent={"center"}>
                  <IconButton
                    backgroundColor="transparent"
                    color="#1A202C"
                    aria-label="google-signup"
                    icon={<Icon as={FaGoogle} />}
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    title="Continue with Google"
                  />
                  <IconButton
                    backgroundColor="transparent"
                    color="#1A202C"
                    aria-label="git-signup"
                    icon={<Icon as={FaGithub} />}
                    title="Continue with Github"
                  />
                  <IconButton
                    backgroundColor="transparent"
                    color="#1A202C"
                    aria-label="show-signup"
                    icon={<Icon as={FaFacebook} />}
                    title="Continue with Facebook"
                  />
                  <IconButton
                    backgroundColor="transparent"
                    color="#1A202C"
                    aria-label="show-signup"
                    icon={<Icon as={FaTwitter} />}
                    title="Continue with X"
                  />
                </Flex>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default LoginForm;

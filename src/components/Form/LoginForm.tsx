"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import UserOperations from "@/graphql/operations/users";
import { useMutation } from "@apollo/client";
import { Field, Formik } from "formik";
import Inputs from "@/components/Inputs";
import { signIn } from "next-auth/react";

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
      callbackUrl: "/auth",
    });

    if (res?.ok) {
      setLoading(!loading);
    }
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

  return (
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
          className="w-[500px] h-auto rounded-xl p-5 "
        >
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
                {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
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
                {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
              </Alert>
            )}

            <Button type="submit" isLoading={loading} _hover={{}}>
              Login
            </Button>
            <Link textAlign="center" href="/auth/signup">
              Signup
            </Link>

            <Text align="center">Or</Text>
            <Text align="center">Login using</Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <IconButton
                backgroundColor="transparent"
                aria-label="google-signup"
                icon={<Icon as={FaGoogle} />}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                title="Continue with Google"
              />
              <IconButton
                backgroundColor="transparent"
                aria-label="git-signup"
                icon={<Icon as={FaGithub} />}
                title="Continue with Github"
              />
              <IconButton
                backgroundColor="transparent"
                aria-label="show-signup"
                icon={<Icon as={FaFacebook} />}
                title="Continue with Facebook"
              />
              <IconButton
                backgroundColor="transparent"
                aria-label="show-signup"
                icon={<Icon as={FaTwitter} />}
                title="Continue with X"
              />
            </Flex>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;

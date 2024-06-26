"use client";

import { useMutation } from "@apollo/client";
import {
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { Formik, Field } from "formik";
import React from "react";
import UserOprations from "@/graphql/operations/users";
import { CreateUserAccount, CreateUserAccountVariables } from "@/utils/types";
import Inputs from "@/components/Inputs";
import { toast } from "../ToastContainerProvider";
import { signOut } from "next-auth/react";

interface AuthFormProps {
  session: Session | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ session }) => {
  const [createUserAccount, { loading, data }] = useMutation<
    CreateUserAccount,
    CreateUserAccountVariables
  >(UserOprations.Mutation.createUserAccount, {
    onCompleted: (res) => {
      const { createUserAccount } = res
      if(!createUserAccount.error){
        toast({
          title: 'Account created.',
          description: createUserAccount.statusText,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setTimeout(() => {
          signOut()
        }, 2000);
      }


    }
  });

  const handleCreateUserAccount = async (value: any) => {
    createUserAccount({
      variables: {
        email: value.email,
        phone: value.phone,
        password: value.password,
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
      },
    });
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

  const handleRequiedFieldValidation = (value: string) => {
    let error;

    if (!value) {
      error = "This field is required";
    }

    return error;
  };

  return (
    <Formik
      key={session?.user?.id}
      initialValues={{
        email: session?.user.email || "",
        phone: "",
        firstName: session?.user?.name?.split(" ")[0] || "",
        middleName: "",
        lastName: session?.user?.name?.split(" ")[1] || "",
        password: "",
        repassword: "",
      }}
      onSubmit={(values) => handleCreateUserAccount(values)}
    >
      {({ handleSubmit, errors, touched }) => (
        <form
          onSubmit={handleSubmit}
          className="w-[500px] h-auto rounded-xl p-5 "
        >
          <Stack gap={3}>
            <Text letterSpacing={0.5} fontSize={"2xl"} align="center">
              Continue to create account
            </Text>
            <Text letterSpacing={0.5} fontSize={"sm"} align="center">
              Welcome to ChatMoko
            </Text>
            <FormControl isInvalid={!!errors.firstName && touched.firstName}>
              <FormLabel>First Name</FormLabel>
              <Field
                as={Input}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                validate={handleRequiedFieldValidation}
              />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Field
                as={Input}
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Enter your middle name"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.middleName && touched.middleName}>
              <FormLabel>Last Name</FormLabel>
              <Field
                as={Input}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                validate={handleRequiedFieldValidation}
              />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Field
                as={Input}
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your  phone"
              />
            </FormControl>

            <Inputs.PasswordInput
              touched={touched}
              errors={errors}
              handlePasswordValidation={handlePasswordValidation}
            />
            {/* <FormControl isInvalid={!!errors.repassword && touched.repassword}>
                <FormLabel>Repeat password</FormLabel>
                <InputGroup>
                  <Field 
                    as={Input}
                    id="repassword"
                    name="repassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your last name"
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
              </FormControl> */}

            <Button type="submit" isLoading={loading}>
              Continue
            </Button>

            {data?.createUserAccount.error && (<Text>{data.createUserAccount.error}</Text>)}
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;

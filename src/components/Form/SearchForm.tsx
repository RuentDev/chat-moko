"use client"
import { FormControl, FormErrorMessage, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { FC } from "react";
import { SlMagnifier } from "react-icons/sl";

interface SearchFormProps {};

const SearchForm:FC<SearchFormProps> = (props) => {

  const handleCreateUserAccount = (values: any) => {

  }

  return (
    <Formik
      initialValues={{
        username: ""
      }}
      onSubmit={(values) => handleCreateUserAccount(values)}
    >
    {({ handleSubmit, errors, touched }) => (
      <form 
        onSubmit={handleSubmit}
        className="w-[500px] h-auto rounded-xl border-white border-[1px]"
      >
        <FormControl isInvalid={!!errors.username && touched.username}>
          <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <SlMagnifier color='gray.300'/>
          </InputLeftElement>
          <Input type='text' />
        </InputGroup>
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
      </form>
    )}
    </Formik>
  )
};

export default SearchForm;
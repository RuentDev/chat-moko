"use client";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  touched: any;
  errors: any;
  handlePasswordValidation: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  errors,
  touched,
  handlePasswordValidation,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl isInvalid={!!errors.password && touched.password}>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          validate={handlePasswordValidation}
        />
        <InputRightElement>
          <IconButton
            backgroundColor="transparent"
            scale={0.5}
            _hover={{ backgroundColor: "transparent" }}
            fontSize="sm"
            aria-label="show-password"
            icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />}
            onClick={() => setShowPassword(!showPassword)}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors.password}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;

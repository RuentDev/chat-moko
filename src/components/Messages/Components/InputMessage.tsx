"use client";
import {
  Flex,
  FormControl,
  Icon,
  IconButton,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { SlOptions } from "react-icons/sl";
import {
  FaImage,
  FaLocationArrow,
  FaMicrophone,
  FaSmile,
} from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import MessageOperations from "@/graphql/operations/message";
import { SendMessageResponse, SendMessageVariables } from "@/utils/types";

interface InputMessageProps {}

const InputMessage: React.FC<InputMessageProps> = (props) => {
  const [sendMessage, { data, loading, error }] =
    useMutation<SendMessageResponse>(MessageOperations.Mutation.sendMessage);

  const handleSendMessage = (
    values: any,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void
  ) => {
    sendMessage({
      variables: {
        conversationId: "",
        participants: [
          "e7f64345-cc1b-4088-9b74-33f55ffc4078",
          "2831e88c-674f-4d4e-91a5-4dec22f91f24",
        ],
        content: values.content,
        files: values.files,
        media: values.media,
      },
    });

    const error = data?.sendMessage.error;

    if (error) {
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{
        content: "",
        media: [],
        files: [],
      }}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        handleSendMessage(values, setSubmitting, resetForm)
      }
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <Flex
            className="chat-bottom-container w-full h-auto bg-[#1A202C] p-5 flex"
            borderTop="1px"
            borderColor="#2C3E61"
          >
            <form onSubmit={handleSubmit} className="w-full h-full">
              <Flex className="items-center">
                <IconButton
                  isRound
                  backgroundColor="transparent"
                  icon={<Icon as={FaSmile} />}
                  aria-label="Emojies"
                  fontSize="35px"
                />
                <FormControl>
                  <Flex
                    padding="1rem"
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Input
                      id="message"
                      name="content"
                      type="text"
                      placeholder="Say something..."
                      height="36px"
                      width="481.35px"
                      backgroundColor="white"
                      borderColor="#888888"
                      borderRadius="10px"
                      borderWidth="1px"
                    />
                  </Flex>
                </FormControl>
                {/* Right Items */}
                <IconButton
                  isRound
                  display="flex"
                  backgroundColor="#2A9DF4"
                  icon={<Icon as={IoSend} color="white"/>}
                  aria-label="Send"
                  type="submit"
                  isLoading={loading}
                />
                <IconButton
                  isRound
                  backgroundColor="transparent"
                  icon={<Icon as={SlOptions} />}
                  aria-label="Send"
                  type="submit"
                  isLoading={loading}
                />
              </Flex>
            </form>
          </Flex>
        );
      }}
    </Formik>
  );
};

export default InputMessage;

"use client";
import {
  Flex,
  FormControl,
  Icon,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
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
          <Flex className="chat-bottom-container w-full h-auto bg-[#282832] p-5 flex">
            <Flex className="justify-between items-center bg-[#212229] w-full">
              <Flex className="w-full items-center">
                <form onSubmit={handleSubmit} className="w-full h-full">
                  <Flex>
                    <FormControl>
                      <Flex
                        padding="1rem"
                        gap={1}
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                      >
                        <IconButton
                          isRound
                          backgroundColor="transparent"
                          aria-label="Voice Message"
                          icon={<Icon as={FaMicrophone} />}
                        />
                        <Field
                          as={Textarea}
                          id="message"
                          name="content"
                          type="text"
                          placeholder="Enter you message here..."
                          resize="none"
                          height="100%"
                          minHeight="2rem"
                          ringOffset={"none"}
                          border="none"
                          boxShadow="none"
                          padding="1"
                        />
                      </Flex>
                    </FormControl>
                    {/* Right Items */}
                    <div className="right-items w-auto flex items-center p-5 gap-3">
                      <IconButton
                        isRound
                        backgroundColor="transparent"
                        icon={<Icon as={IoSend} />}
                        aria-label="Send"
                        type="submit"
                        isLoading={loading}
                      />
                      <IconButton
                        isRound
                        backgroundColor="transparent"
                        icon={<Icon as={FaSmile} />}
                        aria-label="Emojies"
                      />
                      <IconButton
                        isRound
                        backgroundColor="transparent"
                        icon={<Icon as={FaImage} />}
                        aria-label="Upload Image"
                      />
                      <IconButton
                        isRound
                        backgroundColor="transparent"
                        icon={<Icon as={FaLocationArrow} />}
                        aria-label="Location"
                      />
                      <IconButton
                        isRound
                        backgroundColor="transparent"
                        icon={<Icon as={SlLocationPin} />}
                        aria-label="Upload Image"
                      />
                    </div>
                  </Flex>
                </form>
              </Flex>
            </Flex>
          </Flex>
        );
      }}
    </Formik>
  );
};

export default InputMessage;

"use client";
import {
  Flex,
  FormControl,
  Icon,
  IconButton,
  Textarea,
  Input,
  Container,
} from "@chakra-ui/react";
import { Field, Formik, FormikHelpers } from "formik";
import React from "react";
import { SlOptions } from "react-icons/sl";
import {
  FaImage,
  FaLocationArrow,
  FaMicrophone,
  FaSmile,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import MessageOperations from "@/graphql/operations/message";
import { ConversationParticipant, SendMessageResponse, SendMessageVariables } from "@/utils/types";

interface InputMessageProps {
  user: any;
  conversationId: string;
  participants: ConversationParticipant[];
}

const InputMessage: React.FC<InputMessageProps> = ({conversationId, user, participants}) => {
  const [sendMessage, { loading }] = useMutation<SendMessageResponse>(MessageOperations.Mutation.sendMessage);

  const handleSendMessage = (values: any,  resetForm: () => void) => {

    const conversationParticipants = participants.map((participant) => {
      if(participant.user.id !== user.id){
        return participant.user.id
      }
    }).filter(item => item !== undefined)

    sendMessage({
      variables: {
        conversationId: conversationId,
        participants: [user.id, ...conversationParticipants],
        content: values.message,
        files: values.files,
        media: values.media,
      },
    });

    resetForm()

    
  };

  return (
    <Formik
      initialValues={{
        message: "",
        media: [],
        files: [],
      }}
      onSubmit={(values, {setSubmitting, resetForm}) =>handleSendMessage(values, resetForm)
      }
    >
      {({ handleSubmit, errors, touched }) => {
        return (
          <Container
            p={2}
            m={0}
            maxW="100%"
            borderLeft={0}
            borderRight={0}
          >
            <Flex
              className="input-msg-container"
              width="100%"
              height="112px"
              backgroundColor="#1A202C"
              alignItems="center"
            >
            <form onSubmit={handleSubmit} className="w-full">
              <Flex alignItems="center" width="100%">
                <IconButton
                  isRound
                  backgroundColor="transparent"
                  icon={<Icon as={FaSmile} />}
                  aria-label="Emojies"
                  fontSize="35px"
                />
                <Field name="message">
                  {({ field }: { field: any }) => (
                    <FormControl width="100%">
                      <Flex
                        padding="1rem"
                        gap={1}
                        width="100%"
                      >
                        <Input
                          {...field}
                          id="message"
                          type="text"
                          color="black"
                          placeholder="Say something..."
                          height="36px"
                          width="100%"
                          backgroundColor="white"
                          borderColor="#888888"
                          borderRadius="10px"
                          borderWidth="1px"
                        />
                      </Flex>
                    </FormControl>
                  )}
                </Field>

                <IconButton
                  isRound
                  display="flex"
                  backgroundColor="#2A9DF4"
                  color="black"
                  icon={<Icon as={IoSend} color=""/>}
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
                />
              </Flex>
            </form>
            </Flex>
         </Container>
        );
      }}
    </Formik>
  );
};

export default InputMessage;

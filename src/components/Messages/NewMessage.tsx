"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { Avatar, Container, Flex, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";
import UserOperation from '@/graphql/operations/users'
import { SearchConnections, SearchConnectionsVariables } from "@/utils/types";
import Inputs from '@/components/Inputs'

interface NewMessageProps {}

const NewMessage: FC<NewMessageProps> = ({}) => {
  const { data: session } = useSession();
  const [users, setUsers] = React.useState<any[]>([]);
  const [userInput, setUserInput] = React.useState("");
  
  const {data, error} = useQuery<SearchConnections, SearchConnectionsVariables>(UserOperation.Queries.searchConnections, {
    variables: {
      name: userInput
    }
  })

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(prevState =>  prevState = value)
  }

  const handleSelectUser = (user: any) => {
    setUsers(prevState => [...prevState, user])
    setUserInput("")
  }

  return (
    <Flex width="100%" flexDirection="column" justifyContent="space-between">
      {/* HEADER */}
      <Container
        p={5}
        border={0}
        maxW="100%"
      >
        <Container
          p={0}
          borderRadius={10}
          maxW="100%"
          position="relative"
        >
          {/* INPUT */}
          <Container maxW="100%" height="100%" flexDirection="column" border={0} >
            <Flex gap={1}>
              <Text width="auto">To: </Text>
              <Text whiteSpace={"nowrap"} display="block">{users.map((user) => { return `${user.name}, ` })}</Text>
              <Container maxW="100%" p={0} m={0} position="relative" border={0}>
                <Input
                  autoFocus
                  type="text"
                  width="100%"
                  value={userInput}
                  variant="unstyled"
                  onChange={handleUserInputChange}
                />
                {/* USERS */}
                {data && data?.searchConnections?.data?.length > 0 && (
                  <Container
                    position="absolute"
                    bottom={"-65%"}
                    left={0}
                    transform={"translateY(100%)"}
                    borderRadius={10}
                    m={0}
                    w="auto"
                  >
                    <Flex flexDirection="column" gap={2}>
                      {data?.searchConnections?.data?.map((user) => (
                        <Flex 
                          gap={2} 
                          key={user.id}
                          cursor="pointer"
                          alignItems="center" 
                          onClick={() => handleSelectUser(user)}
                        >
                          <Avatar 
                            size="xs"
                            name={user.name}
                            src={user.image}
                          />
                          <Text>{user.name}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Container>
                )}
              </Container>
            </Flex>
          </Container>
        </Container>
      </Container>
      {/* INPUT */}
      <Inputs.InputMessage 
        conversationId="new" 
        user={session?.user} 
        participants={users.map(user => { return user.id })} 
      />
    </Flex>
  );
};

export default NewMessage;

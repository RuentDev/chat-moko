import { NextPage } from "next";
import { auth } from "../../auth";
import { Avatar,  Center, Flex, HStack, IconButton, Text, Button, Image } from "@chakra-ui/react";
import { Forms } from "@/components";
import { IoSunnyOutline } from "react-icons/io5";
const DashboardPage: NextPage = async () => {
  const session = await auth();
  

  return (
    <main className="w-full h-full">
      <HStack width="100%" justifyContent="space-between" padding="0.5rem">
       <Forms.SearchForm />
       <Flex gap={3} alignItems="center" justifyContent="center">
        <IconButton 
          isRound
          bg="transparent"
          aria-label="theme"
          icon={<IoSunnyOutline color="#ffffff" size="25"/>}
        />
        {session && session.user && (
        <Avatar 
          size="sm"
          name={session.user.name || ""}
          src={session.user.image || ""}
        />
        )}
       </Flex>
      </HStack>
      
      <Center width="100%" height="90%">
        <Flex 
          gap={5}
          direction="column" 
          alignItems="center" 
          justifyContent="center"
        >
          <Text
            as="h3"
            fontSize={35}
          >
            Welcome Back, {session?.user.name}
          </Text>

          <Image 
            width='350px'
            alt='Chat Moko'
            objectFit='cover'
            src='/images/chatmoko-high-resolution-logo-transparent-blue.png' 
          />

          <Text
            as="h3"
            fontSize={35}
          >
            Start Conversation with your contacts
          </Text>

          <Text
            width="450px"
            as="p"
            textAlign="center"
          >
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
          </Text>

          <Flex gap={10}>
            <Button 
              color="#ffffff"
              bg="#2A9DF4"
              borderBottomRightRadius={0}
            >
              Call Now
            </Button>
            <Button
              colorScheme='#2A9DF4'
              variant="outline"
              borderBottomLeftRadius={0}
            >
              Start Chat
            </Button>
          </Flex>
        </Flex>

      </Center>

    </main>
  );
};

export default DashboardPage;

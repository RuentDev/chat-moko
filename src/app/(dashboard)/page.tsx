import { NextPage } from "next";
import { auth } from "../../auth";
import {
  Avatar,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  Button,
  Image,
  Box,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Forms } from "@/components";
import { IoSunnyOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { Show, Hide } from "@chakra-ui/react";



const DashboardPage: NextPage = async () => {
  const session = await auth();

  // const query = `
  //   query Connections {
  //     connections {
  //       token
  //       statusText
  //       error
  //       data
  //     }
  //   }
  // `

  // const res = await fetch("http://localhost:4000/graphql", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiaWo2cUZ3dTJUZnNWOURWYl9vYW5tREpUN1lRcFJzaWxhQlFUbFNQcThjRWpLS0Zvc25uRXVXbzZJbWZJSmNSUVB2ZUdweldTNWdpdDVYQXVUT0I5QUEifQ..z2e3HYSz52a0Pd2atq5vrQ.IaSrf0xvdmDuXem9NjKB7C6cI1TvlCEFRx8iqrBgI-epvJjtAC5ydHJBCldj3Inu_r4yOx0zKOwEVzQHKA7c5N2JRV8NirKB4gylzOgEjfafrPWDEZBjM9hcZ6woTa2Rvfn3Rt5AKM-cxMm6sOl5Hb3iB7Ka6gfGTrfgTUj96Xl-sDySOONRpbxUHvaMHRZz88qnZivAmegfdqxU9cBH1lZwz3HFH7TDUxMDc0EaydwZedOX6M3fAKgcXQYGZk6EawRDhOL0HXfWGEQz9k7HOEv6O9BlsLNf6lPDRzWvLqiKHxIwRW-WdhjdvMmUpXloHGNLiHrCT2alR7SlRxp479cE50p0Xbf3PU765IpvjbEt8-_oDDRM2h8CkuBB2PE1-7798uMFOOk1tAeSWNr3cAUhD2N4YxssHKHbhSiVLarqkzLuYhVlyXzZ3j5mz5GAIfXIr0hdcbMYFzb0murZ-6clJjygXmXJWeA0fx3a4FHYKeKtJzU3CFMoTMRmxdA-b4PrsV8UrwQni6XUthJprPvDur7xCsL3fQG49QfF1F_w9Im40lyVzThet-YLmGr2XlCbJQNw7CkrNgg4dgcnXkjETttsLqSwfd_GyP6D_IeW-CX1segMeVYTVHmF-JkHV4WdRJDvE4srj5jhKFA8MhovAnBryaYB5yCy2Uw9WAMCC_ml7DkiBbNHPiiVv9EVATuBqCtRtluqGy8GnQloVh3FZ7Td_pmnrCP3_sAS9jBoxnqoj7h9hStJQPaIt5_8TR1IiTz7VjGGZNO1FqiNe_iZwUNwV4yBlulJbYeD46ittUQN6UTmF1PrslGXOKwhyEhu5bMrhaY4_6tUrGzsMnDoQxFUBblElMecOZ7T3Mc.B-i1Pqmjus10PWwDSOdrzlx9vweVpbWX0oOA7J2b_J8`,
  //   },
  //   body: JSON.stringify({ query: query }),
  // })

  // const data = await res.json()

  // console.log(data)

  return (
    <main className="w-full h-full">
      <Center width="100%" height="100%">
        <Flex
          gap={5}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text as="h3" fontSize={{ base: 20, lg: 35 }}>
            Welcome Back, {session?.user.name}
          </Text>

          <Image
            width={{ base: "219px", lg: "369px" }}
            alt="Chat Moko"
            objectFit="cover"
            src="/images/chatmoko-high-resolution-logo-transparent-blue.png"
          />

          <Text as="h3" fontSize={{ base: 20, lg: 35 }}>
            Start Conversation with your contacts
          </Text>

          <Text
            width={{ base: "350px", lg: "656px" }}
            fontSize={{ base: 12, lg: 23 }}
            as="p"
            textAlign="center"
          >
            There are many variations of passages of Lorem Ipsum available,but
            the majority have suffered alteration in some form
          </Text>

          <Flex gap={10}>
            <Button color="#ffffff" bg="#2A9DF4" borderBottomRightRadius={0}>
              Call Now
            </Button>
            <Button
              colorScheme="#2A9DF4"
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

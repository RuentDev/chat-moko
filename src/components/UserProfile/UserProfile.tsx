'use client'
import React from 'react'
import { Session } from 'next-auth'
import { Avatar, Text, GridItem, HStack, Container, AvatarBadge, VStack, Spinner } from '@chakra-ui/react'

interface UserProfileProps {
	session?: Session | null
	imageSize?: "sm" | "md" | "lg"
	name?: string,
	status?: "Active" | "Do not disturb" | "Away"
}


const UserProfile: React.FC<UserProfileProps> = ({ session, imageSize, name, status }) => {

	return(
		<Container border={0} p={0}>
			<HStack gap={3} cursor="pointer" onClick={() => {}}>
				<GridItem w="auto" h="auto">
						<Avatar
							name={session?.user?.name || name || "User"}
							src={session?.user?.image || ""}
							size={imageSize || "md"}
						>
							<AvatarBadge boxSize='1rem' bg={status === "Active" ? "green.500" : status === "Away" ? "yellow.500" : status === "Do not disturb" ? "red.500" : "red.500"} />
						</Avatar>
				</GridItem>
				<VStack gap={0}>
					<GridItem w="100%" h="auto">
						<Text fontSize="medium" >
							{session?.user?.name || name || "User"}
						</Text>
					</GridItem>
					<GridItem w="100%" h="auto">
						<Text fontSize="small" color={status === "Active" ? "green.500" : status === "Away" ? "yellow.500" : status === "Do not disturb" ? "red.500" : "red.500"}>
							{status || "Active"}
						</Text>
					</GridItem>
				</VStack>
			</HStack>
		</Container>
	)
}

export default UserProfile
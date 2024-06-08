'use client'
import React from 'react'
import { Session } from 'next-auth'
import { Avatar, Text, GridItem, HStack, Container, AvatarBadge, VStack, Spinner } from '@chakra-ui/react'

interface UserProfileProps {
	session?: Session | null
}


const UserProfile: React.FC<UserProfileProps> = ({ session }) => {

	return(
		<Container border={0} p={0}>
			<HStack gap={3} cursor="pointer" onClick={() => {}}>
				<GridItem w="auto" h="auto">
					{!session || !session.user ? (
						<Spinner />
					) : (
						<Avatar
							name={session?.user?.name || "User"}
							src={session?.user?.image || ""}
							size="md"
						>
							<AvatarBadge boxSize='1rem' bg='green.500' />
						</Avatar>
					)}
				</GridItem>
				<VStack gap={0}>
					<GridItem w="100%" h="auto">
						<Text fontSize="medium" >
							{session?.user?.name || "User"}
						</Text>
					</GridItem>
					<GridItem w="100%" h="auto">
						<Text fontSize="small" color="green.500">
							Active
						</Text>
					</GridItem>
				</VStack>
			</HStack>
		</Container>
	)
}

export default UserProfile
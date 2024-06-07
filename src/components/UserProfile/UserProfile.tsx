'use client'
import React from 'react'
import { Session } from 'next-auth'
import { Avatar, Text, GridItem, HStack, Container, AvatarBadge, VStack } from '@chakra-ui/react'

interface UserIconProps {
	Session?: Session | null
}

const UserProfile = (props: UserIconProps) => {
    return (
			<Container border={0}>
				<HStack gap={3} cursor="pointer" onClick={() => {}}>
					<GridItem w="auto" h="auto">
						<Avatar
							name="Lee Ryan Garcia"
							size="md"
						>
							<AvatarBadge boxSize='1rem' bg='green.500' />
						</Avatar>
					</GridItem>
					<VStack gap={0}>
						<GridItem w="100%" h="auto">
							<Text fontSize="small" >
								Lee Ryan Garcia
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
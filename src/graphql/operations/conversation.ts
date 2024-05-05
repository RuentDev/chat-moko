import { gql } from '@apollo/client'

const shema = {
   Queries: {
    getConvesations: gql`
      query GetConversation($userId: String) {
        getConversation(userId: $userId) {
          id
          title
          creatorId
          createdAt
          updatedAt
          deletedAt
          participants {
            id
            hasSeenLatestMessage
            userId
            conversationId
            user {
              first_name
              middle_name
              last_name
              image
            }
          }
          messages {
            id
            senderId
            createdAt
            content
          }
        }
      }
    `
   },
   Mutation: {},
   Subscription: {}
}

export default shema;
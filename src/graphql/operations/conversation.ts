import { gql } from "@apollo/client";

const shema = {
  Queries: {
    getConversation: gql(`
      query GetConversation($conversationId: String) {
        getConversation(conversationId: $conversationId) {
          id
          title
          creatorId
          createdAt
          updatedAt
          deletedAt
          participants {
            id
            user {
              id
              first_name
              middle_name
              last_name
              image
              email
            }
          }
          messages {
            id
            senderId
            type
            content
            attachment_thumb_url
            attachment_url
            createdAt
            updatedAt
            deletedAt
            conversationId
          }
        }
      }
    `),
    conversations: gql(`
      query Conversations {
        conversations {
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
              id
              email
              first_name
              middle_name
              last_name
              image
              phone
            }
          }
          messages {
            id
            type
            content
            attachment_thumb_url
            attachment_url
            createdAt
            updatedAt
          }
        }
      }
    `),
  },
  Mutation: {},
  Subscription: {
    conversation: gql(`
      subscription Subscription {
        convesations {
          id
          title
          creatorId
          deletedAt
          createdAt
          updatedAt
        }
      }
    `),
  },
};

export default shema;

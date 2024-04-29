import { gql } from "@apollo/client";


export const GET_CONVERSATIONS =  gql(`
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
        email
        phone
        first_name
        middle_name
        last_name
        verification_code
        is_active
        is_reported
        is_blocked
        createAt
        updatedAt
        role
      }
      messages {
        id
        content
      }
    }
  }
`)

export const GET_MESSAGES = gql(`
  query GetMessages($conversationId: String) {
    getMessages(conversationId: $conversationId) {
      id
      senderId
      type
      content
      attachment_thumb_url
      attachment_url
      createdAt
      updatedAt
      deletedAt
    }
  }
`)
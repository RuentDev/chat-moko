import { gql } from "@apollo/client";

export const GET_USER_CONVERSATIONS = gql`
  query GetAllUserConversation($userId: String) {
  getAllUserConversation(userId: $userId) {
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
      type
      content
      attachment_thumb_url
      attachment_url
      createdAt
      updatedAt
      deletedAt
    }
  }
}

`;


export const GET_CONVERSATIONS_MESSAGES = gql`
  query GetAllConversationMessages($conversationId: String) {
    getAllConversationMessages(conversationId: $conversationId) {
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
`;

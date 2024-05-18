import { gql } from "@apollo/client";

const shema = {
  Queries: {
    messages: gql(`
     query Messages($conversationId: String) {
      messages(conversationId: $conversationId) {
        id
        conversationId
        senderId
        user{
          name
          first_name
          middle_name
          last_name
        }
        type
        content
        attachment_thumb_url
        attachment_url
        createdAt
        updatedAt
        deletedAt
      }
    }
    `),
  },
  Mutation: {
    sendMessage: gql(`
      mutation SendMessage($conversationId: String, $participants: [String], $content: String, $media: [String], $files: [File]) {
        sendMessage(conversationId: $conversationId, participants: $participants, content: $content, media: $media, files: $files) {
          error
          statusText
        }
      }
    `),
  },
  Subscription: {
    messageSent: gql(`
      subscription MessageSent {
        messageSent {
          id
          type
          content
          attachment_thumb_url
          attachment_url
          createdAt
          updatedAt
          deletedAt
          conversationId
          senderId
          user {
            id
            email
            name
            phone
            image
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
        }
      }
    `),
  },
};

export default shema;

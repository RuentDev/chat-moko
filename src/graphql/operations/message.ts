import { gql } from '@apollo/client'


const MessageFields = `
  message{
    id
    senderId
    user {
      id
      email
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
    type
    content
    attachment_thumb_url
    attachment_url
    createdAt
    updatedAt
    deletedAt
    conversationId
  }
`

const shema = {
   Queries: {
    messages: gql(`
     query GetMessages($conversationId: String) {
      messages(conversationId: $conversationId) {
        id
        conversationId
        senderId
        user{
          id
          email
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
   },
   Mutation: {
    sendMessage: gql(`
      mutation SendMessage($conversationId: String, $senderId: String, $recipientId: String, $content: String, $media: [String], $files: [File]) {
        sendMessage(conversationId: $conversationId, senderId: $senderId, recipientId: $recipientId, content: $content, media: $media, files: $files) {
          error
          statusText
        }
      }
    `)
   },
   Subscription: {
    messageSent: gql(`
      subscription MessageSent {
        messageSent {
          id
          senderId
          user {
            id
            email
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
    `)
   }
}

export default shema;
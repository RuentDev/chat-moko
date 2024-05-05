interface ConversationParticipant{
  id: string
  hasSeenLatestMessage: boolean
  userId: string
  conversationId: string
  user: User
}

interface User {
  id: string
  email: string
  phone: string
  image: string
  first_name: string
  middle_name: string
  last_name: string
  verification_code: string
  is_active: boolean
  is_reported: boolean
  is_blocked: boolean
  createAt: string
  updatedAt: string
  role: string
}


export interface CreateUserAccount {
  createUserAccount: {
    error: string
    user: string
    statusText: string
  }
}

export interface CreateUserAccountVariables {
  email: string
  phone: string
  password: string
  firstName: string
  middleName: string
  lastName: string
}

export interface UserSession{
  id: string
  email: string
  emailVerified: string
  password: string
  firstName: string
  middleName: string
  lastName: string

}


/*
  CONVERSATION
*/

interface Conversation{
    id:  string,
    title: string,
    creatorId: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    participants: ConversationParticipant[]
    messages: Message[]
}

export interface GetConversation {
  getConversation: Conversation[]
}

export interface GetConversationVariables {
  userId: string
}


/*
  MESSAGES
*/
export interface Message {
  id: string
  senderId: string
  user: User
  type: string
  content: string
  attachment_thumb_url: string
  attachment_url: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Messages{
  messages: Message[]
}
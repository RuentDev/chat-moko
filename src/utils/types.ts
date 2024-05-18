export interface ConversationParticipant {
  id: string;
  hasSeenLatestMessage: boolean;
  userId: string;
  conversationId: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  image: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  verification_code: string;
  is_active: boolean;
  is_reported: boolean;
  is_blocked: boolean;
  createAt: string;
  updatedAt: string;
  role: string;
}

export interface CreateUserAccount {
  createUserAccount: {
    error: string;
    user: string;
    statusText: string;
  };
}

export interface CreateUserAccountVariables {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface UserSession {
  id: string;
  email: string;
  emailVerified: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

/*
  CONVERSATION
*/

export interface Conversation {
  id: string;
  title: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  type: string;
  participants: ConversationParticipant[];
  messages: Message[];
}

export interface ConversationQuery {
  conversations: Conversation[];
}

export interface GetConversationVariables {
  userId: string;
}

/*
  MESSAGES
*/
export interface Message {
  id: string;
  type: string;
  content: string;
  attachment_thumb_url: string;
  attachment_url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  conversationId: string;
  senderId: string;
  user: User;
  __typename: string;
}

export interface Messages {
  messages: Message[];
}

export interface SendMessageVariables {
  conversationId: string;
  senderId: string;
  participants: string[];
  content: string;
  files: string[];
  media: string[];
}

/*
  SEND MESSAGE RESPONSE
*/

export interface SendMessageResponse {
  sendMessage: {
    error: string;
    message: string;
    statusText: string;
  };
}

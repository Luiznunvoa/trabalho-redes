import { type Conversation } from '@prisma/client'

export interface ConversationsRepository {
  create: (data: { name: string; userId: string }) => Promise<Conversation>
  findById: (
    id: string,
  ) => Promise<(Conversation & { participants: any[] }) | null>
  addUserToConversation: (
    userId: string,
    conversationId: string,
  ) => Promise<void>
  getUserConversations: (
    userId: string,
    page: number,
  ) => Promise<Conversation[]>
  findAllConversations: (page: number) => Promise<Conversation[]>
  isUserInConversation: (userId: string, conversationId: string) => Promise<boolean>
}

import { PrismaConversationsRepository } from '@/repositories/prisma/prisma-conversations-repository'
import { CreateConversationUseCase } from '../create-conversation'

export function makeCreateConversationUseCase() {
  const conversationsRepository = new PrismaConversationsRepository()
  const createConversationUseCase = new CreateConversationUseCase(
    conversationsRepository,
  )

  return createConversationUseCase
}

import { PrismaMessagesRepository } from '@/repositories/prisma/prisma-messages-repository'
import { CreateMessageUseCase } from '../create-message'
import { PrismaConversationsRepository } from '@/repositories/prisma/prisma-conversations-repository'

export function makeCreateMessageUseCase() {
  const messageRepository = new PrismaMessagesRepository()
  const conversationRepository = new PrismaConversationsRepository()
  const useCase = new CreateMessageUseCase(
    messageRepository,
    conversationRepository,
  )

  return useCase
}

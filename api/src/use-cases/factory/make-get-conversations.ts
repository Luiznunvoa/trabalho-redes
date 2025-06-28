import { GetConversationsUseCase } from '../get-conversations'
import { PrismaConversationsRepository } from '@/repositories/prisma/prisma-conversations-repository'

export function makeGetConversationsUseCase() {
  const conversationsRepository = new PrismaConversationsRepository()
  const useCase = new GetConversationsUseCase(conversationsRepository)

  return useCase
}

import { AddUserToConversationUseCase } from '../add-user-to-conversation'
import { PrismaConversationsRepository } from '@/repositories/prisma/prisma-conversations-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAddUserToConversationUseCase() {
  const conversationsRepository = new PrismaConversationsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AddUserToConversationUseCase(
    conversationsRepository,
    usersRepository,
  )

  return useCase
}

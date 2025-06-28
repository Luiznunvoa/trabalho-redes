import { PrismaConversationsRepository } from '@/repositories/prisma/prisma-conversations-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUsersInConversationUseCase } from '../get-users-in-conversation'

export function makeGetUsersInConversationUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const conversationsRepository = new PrismaConversationsRepository()
  const getUsersInConversationUseCase = new GetUsersInConversationUseCase(
    usersRepository,
    conversationsRepository,
  )

  return getUsersInConversationUseCase
}

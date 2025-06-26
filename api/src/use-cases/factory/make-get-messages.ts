import { PrismaMessagesRepository } from '@/repositories/prisma/prisma-messages-repository'
import { GetMessagesUseCase } from '../get-messages'

export function makeGetMessagesUseCase() {
  const messagesRepository = new PrismaMessagesRepository()
  const getMessagesUseCase = new GetMessagesUseCase(messagesRepository)
  return getMessagesUseCase
}

import { type ConversationsRepository } from '../conversations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaConversationsRepository implements ConversationsRepository {
  async findById(id: string) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
      },
    })

    return conversation
  }

  async addUserToConversation(userId: string, conversationId: string) {
    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        participants: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async getUserConversations(userId: string, page: number) {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return conversations
  }

  async findAllConversations(page: number) {
    const conversations = await prisma.conversation.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return conversations
  }
}

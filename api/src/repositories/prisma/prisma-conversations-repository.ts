import { type ConversationsRepository } from '../conversations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaConversationsRepository implements ConversationsRepository {
  async create(data: { name: string; userId: string }) {
    const conversation = await prisma.conversation.create({
      data: {
        name: data.name,
        participants: {
          connect: {
            id: data.userId,
          },
        },
      },
    })

    return conversation
  }

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
      include: {
        participants: true,
      },
    })

    return conversations
  }

  async isUserInConversation(
    userId: string,
    conversationId: string,
  ): Promise<boolean> {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          where: {
            id: userId,
          },
        },
      },
    })

    return (conversation?.participants.length ?? 0) > 0
  }
}

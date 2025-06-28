import { prisma } from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import { type MessagesRepository } from '../messages-repository'

export class PrismaMessagesRepository implements MessagesRepository {
  async create(data: Prisma.MessageCreateInput) {
    const message = await prisma.message.create({
      data,
    })
    return message
  }

  async findById(id: string) {
    const message = await prisma.message.findUnique({
      where: {
        id,
      },
    })

    return message
  }

  async findManyByConversationId(conversationId: string, page: number) {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    })

    return messages
  }

  async delete(id: string) {
    const message = await prisma.message.delete({
      where: {
        id,
      },
    })

    return message
  }
}

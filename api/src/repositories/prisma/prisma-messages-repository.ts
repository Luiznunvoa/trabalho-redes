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

  async findManyByConversationId(
    conversationId: string,
    page: number,
    pageSize: number,
  ) {
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.message.count({
        where: {
          conversationId,
        },
      }),
    ])

    return { messages, total }
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

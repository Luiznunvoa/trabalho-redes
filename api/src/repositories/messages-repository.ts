import { type Prisma, type Message } from '@prisma/client'

export interface MessagesRepository {
  create: (data: Prisma.MessageCreateInput) => Promise<Message>
  findById: (id: string) => Promise<Message| null>
  delete: (id: string) => Promise<Message>
}

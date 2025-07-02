import { type MessagesRepository } from '@/repositories/messages-repository'
import { type Message } from '@prisma/client'

interface GetMessagesUseCaseRequest {
  conversationId: string
  page: number
  pageSize: number
}

interface GetMessagesUseCaseResponse {
  messages: Array<Message & { sender: { name: string } }>
  total: number
}

export class GetMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute({
    conversationId,
    page,
    pageSize,
  }: GetMessagesUseCaseRequest): Promise<GetMessagesUseCaseResponse> {
    const { messages, total } =
      await this.messagesRepository.findManyByConversationId(
        conversationId,
        page,
        pageSize,
      )

    return { messages, total }
  }
}

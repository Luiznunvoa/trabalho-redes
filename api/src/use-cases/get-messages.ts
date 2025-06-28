import { type MessagesRepository } from '@/repositories/messages-repository'
import { type Message } from '@prisma/client'

interface GetMessagesUseCaseRequest {
  conversationId: string
  page: number
}

interface GetMessagesUseCaseResponse {
  messages: Array<Message & { sender: { name: string } }>
}

export class GetMessagesUseCase {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async execute({
    conversationId,
    page,
  }: GetMessagesUseCaseRequest): Promise<GetMessagesUseCaseResponse> {
    const messages = await this.messagesRepository.findManyByConversationId(
      conversationId,
      page,
    )

    return { messages }
  }
}

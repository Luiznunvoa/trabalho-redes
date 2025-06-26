import { type MessagesRepository } from '@/repositories/messages-repository'

interface CreateMessageUseCaseRequest {
  content: string
  senderId: string
  conversationId: string
}

export class CreateMessageUseCase {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async execute({
    content,
    senderId,
    conversationId,
  }: CreateMessageUseCaseRequest) {
    await this.messageRepository.create({
      content,
      sender: {
        connect: {
          id: senderId,
        },
      },
      conversation: {
        connect: {
          id: conversationId,
        },
      },
    })
  }
}

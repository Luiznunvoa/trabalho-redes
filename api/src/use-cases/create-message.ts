import { type MessagesRepository } from '@/repositories/messages-repository'
import { type ConversationsRepository } from '@/repositories/conversations-repository'
import { UnauthorizedError } from './errors/unauthorized-error'

interface CreateMessageUseCaseRequest {
  content: string
  senderId: string
  conversationId: string
}

export class CreateMessageUseCase {
  constructor(
    private readonly messageRepository: MessagesRepository,
    private readonly conversationRepository: ConversationsRepository,
  ) {}

  async execute({
    content,
    senderId,
    conversationId,
  }: CreateMessageUseCaseRequest) {
    const conversation =
      await this.conversationRepository.findById(conversationId)

    if (conversation === null) {
      throw new Error('Conversation not found')
    }

    const isUserInConversation = conversation.participants.find(
      (participant) => participant.id === senderId,
    )

    if (isUserInConversation === undefined) {
      throw new UnauthorizedError()
    }

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

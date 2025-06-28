import { type ConversationsRepository } from '@/repositories/conversations-repository'
import { type Conversation } from '@prisma/client'

interface CreateConversationUseCaseRequest {
  name: string
  userId: string
}

interface CreateConversationUseCaseResponse {
  conversation: Conversation
}

export class CreateConversationUseCase {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async execute({
    name,
    userId,
  }: CreateConversationUseCaseRequest): Promise<CreateConversationUseCaseResponse> {
    const conversation = await this.conversationsRepository.create({
      name,
      userId,
    })

    return {
      conversation,
    }
  }
}

import { type ConversationsRepository } from '@/repositories/conversations-repository'
import { type UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AddUserToConversationUseCaseRequest {
  userId: string
  conversationId: string
}

export class AddUserToConversationUseCase {
  constructor(
    private readonly conversationRepository: ConversationsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    conversationId,
  }: AddUserToConversationUseCaseRequest) {
    const conversation =
      await this.conversationRepository.findById(conversationId)
    if (conversation === null) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.findById(userId)
    if (user === null) {
      throw new ResourceNotFoundError()
    }

    const isUserInConversation = conversation.participants.find(
      (participant) => participant.id === userId,
    )

    if (isUserInConversation !== undefined) {
      // User is already in the conversation, no action needed.
      return
    }

    await this.conversationRepository.addUserToConversation(
      userId,
      conversationId,
    )
  }
}

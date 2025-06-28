import { type UsersRepository } from '@/repositories/users-repository'
import { type ConversationsRepository } from '@/repositories/conversations-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { type User } from '@prisma/client'

interface GetUsersInConversationUseCaseRequest {
  conversationId: string
}

interface GetUsersInConversationUseCaseResponse {
  users: User[]
}

export class GetUsersInConversationUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async execute({
    conversationId,
  }: GetUsersInConversationUseCaseRequest): Promise<GetUsersInConversationUseCaseResponse> {
    const conversation =
      await this.conversationsRepository.findById(conversationId)

    if (conversation === null) {
      throw new ResourceNotFoundError()
    }

    const users =
      await this.usersRepository.findManyByConversationId(conversationId)

    return { users }
  }
}

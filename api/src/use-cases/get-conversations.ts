import { type ConversationsRepository } from '@/repositories/conversations-repository'

interface GetConversationsUseCaseRequest {
  userId?: string
  page: number
  allConversations?: boolean
}

export class GetConversationsUseCase {
  constructor(
    private readonly conversationRepository: ConversationsRepository,
  ) {}

  async execute({
    userId,
    page,
    allConversations = false,
  }: GetConversationsUseCaseRequest) {
    let conversations

    if (allConversations) {
      conversations =
        await this.conversationRepository.findAllConversations(page)
    } else {
      if (userId === undefined || userId === null) {
        throw new Error('User ID is required for user-specific conversations.')
      }
      conversations = await this.conversationRepository.getUserConversations(
        userId,
        page,
      )
    }

    return { conversations }
  }
}

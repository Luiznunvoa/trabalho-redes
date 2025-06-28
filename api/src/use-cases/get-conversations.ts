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
    allConversations = true,
  }: GetConversationsUseCaseRequest) {
    let conversations

    if (allConversations) {
      conversations = await this.conversationRepository.findAllConversations(page)
    } else {
      conversations = await this.conversationRepository.getUserConversations(
        userId as string,
        page,
      )
    }

    return conversations
  }
}

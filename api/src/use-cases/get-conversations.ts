import { type ConversationsRepository } from '@/repositories/conversations-repository'
import { type Conversation } from '@prisma/client'

interface GetConversationsUseCaseRequest {
  userId: string
  page: number
  allConversations?: boolean
}

interface GetConversationsUseCaseResponse {
  conversations: Array<Conversation & { isParticipant: boolean }>
}

export class GetConversationsUseCase {
  constructor(
    private readonly conversationRepository: ConversationsRepository,
  ) {}

  async execute({
    userId,
    page,
    allConversations = false,
  }: GetConversationsUseCaseRequest): Promise<GetConversationsUseCaseResponse> {
    let conversations

    if (allConversations) {
      const allConvs =
        await this.conversationRepository.findAllConversations(page)

      conversations = await Promise.all(
        allConvs.map(async (conversation) => {
          const isParticipant =
            await this.conversationRepository.isUserInConversation(
              userId,
              conversation.id,
            )
          return { ...conversation, isParticipant }
        }),
      )
    } else {
      conversations = await this.conversationRepository.getUserConversations(
        userId,
        page,
      )
      conversations = conversations.map((conversation) => ({
        ...conversation,
        isParticipant: true,
      }))
    }

    return { conversations }
  }
}

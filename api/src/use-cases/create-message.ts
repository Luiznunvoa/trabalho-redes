import { MessagesRepository } from '@/repositories/messages-repository'

interface CreateMessageUseCaseRequest {
  userId: string,
  conversationId: string,
  // TODO: Outros dados da mensagem
}

export class CreateMessageUseCase {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async execute({ userId, conversationId, }: CreateMessageUseCaseRequest): Promise<void> {
    // TODO: Lógica de criação da mensagem
  }
}

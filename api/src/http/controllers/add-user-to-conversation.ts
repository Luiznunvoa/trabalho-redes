import { makeAddUserToConversationUseCase } from '@/use-cases/factory/make-add-user-to-conversation'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function addUserToConversation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addUserToConversationUseCase = makeAddUserToConversationUseCase()

  const addUserToConversationParamsSchema = z.object({
    conversationId: z.string(),
  })

  const { conversationId } = addUserToConversationParamsSchema.parse(
    request.params,
  )

  await addUserToConversationUseCase.execute({
    conversationId,
    userId: request.userId ?? 'error',
  })

  return await reply.status(204).send()
}

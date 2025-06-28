import { makeGetUsersInConversationUseCase } from '@/use-cases/factory/make-get-users-in-conversation'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUsersInConversation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUsersInConversationParamsSchema = z.object({
    conversationId: z.string().uuid(),
  })

  const { conversationId } = getUsersInConversationParamsSchema.parse(
    request.params,
  )

  const getUsersInConversationUseCase = makeGetUsersInConversationUseCase()

  const { users } = await getUsersInConversationUseCase.execute({
    conversationId,
  })

  return await reply.status(200).send({ users })
}

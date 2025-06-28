import { makeGetConversationsUseCase } from '@/use-cases/factory/make-get-conversations'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getConversations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getConversationsUseCase = makeGetConversationsUseCase()

  const getConversationsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    allConversations: z.coerce.boolean().default(false),
  })

  const { page, allConversations } = getConversationsQuerySchema.parse(
    request.query,
  )

  const conversations = await getConversationsUseCase.execute({
    userId: request.userId,
    page,
    allConversations,
  })

  return await reply.status(200).send(conversations)
}

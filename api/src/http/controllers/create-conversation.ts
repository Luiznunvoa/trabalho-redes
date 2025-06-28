import { makeCreateConversationUseCase } from '@/use-cases/factory/make-create-conversation'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createConversation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createConversationBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createConversationBodySchema.parse(request.body)

  const createConversationUseCase = makeCreateConversationUseCase()

  const { conversation } = await createConversationUseCase.execute({
    name,
    userId: request.userId ?? 'error',
  })

  return await reply.status(201).send({
    conversation,
  })
}

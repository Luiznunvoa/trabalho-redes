import { makeCreateMessageUseCase } from '@/use-cases/factory/make-create-message'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createMessage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createMessageUseCase = makeCreateMessageUseCase()

  const createMessageBodySchema = z.object({
    content: z.string(),
  })

  const createMessageParamsSchema = z.object({
    conversationId: z.string(),
  })

  const { content } = createMessageBodySchema.parse(request.body)

  const { conversationId } = createMessageParamsSchema.parse(request.params)

  await createMessageUseCase.execute({
    content,
    conversationId,
    senderId: request.userId ?? 'error',
  })

  return await reply.status(201).send()
}

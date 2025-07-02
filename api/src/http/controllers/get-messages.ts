import { makeGetMessagesUseCase } from '@/use-cases/factory/make-get-messages'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getMessages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMessagesUseCase = makeGetMessagesUseCase()

  const getMessagesParamsSchema = z.object({
    conversationId: z.string(),
  })

  const getMessagesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
  })

  const { conversationId } = getMessagesParamsSchema.parse(request.params)
  const { page, pageSize } = getMessagesQuerySchema.parse(request.query)

  const { messages, total } = await getMessagesUseCase.execute({
    conversationId,
    page,
    pageSize,
  })

  return await reply.status(200).send({
    messages,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  })
}

import { makeCreateMessageUseCase } from '@/use-cases/factory/make-create-message'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function createMessage(request: FastifyRequest, reply: FastifyReply) {
  const createMessageUseCase = makeCreateMessageUseCase()

}

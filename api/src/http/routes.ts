import { type FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { authentication } from '@/middlewares/authentication'
import { profile } from './controllers/profile'
import { createMessage } from './controllers/send-message'
import { getMessages } from './controllers/get-messages'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.get('/profile', { preHandler: [authentication] }, profile)

  app.post(
    '/conversations/messages/:conversationId',
    { preHandler: [authentication] },
    createMessage,
  )

  app.get(
    '/conversations/messages/:conversationId',
    { preHandler: [authentication] },
    getMessages,
  )
}

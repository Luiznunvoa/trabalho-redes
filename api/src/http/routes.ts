import { type FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { authentication } from '@/middlewares/authentication'
import { profile } from './controllers/profile'
import { createMessage } from './controllers/send-message'
import { getMessages } from './controllers/get-messages'
import { addUserToConversation } from './controllers/add-user-to-conversation'
import { getConversations } from './controllers/get-conversations'
import { createConversation } from './controllers/create-conversation'
import { getUsersInConversation } from './controllers/get-users-in-conversation'

export async function routes(app: FastifyInstance) {
  // Registro de Usuário
  app.post('/users', register)

  // Login de Usuário(Criação de Sessão)
  app.post('/sessions', authenticate)

  // Perfil de usuário
  app.get('/profile', { preHandler: [authentication] }, profile)

  // Criação de conversas
  app.post(
    '/conversations',
    { preHandler: [authentication] },
    createConversation,
  )

  // Busca das conversas
  app.get('/conversations', { preHandler: [authentication] }, getConversations)

  // Criação de mensagens em conversas
  app.post(
    '/conversations/messages/:conversationId',
    { preHandler: [authentication] },
    createMessage,
  )

  // Criação busca das mensagens na conversa
  app.get(
    '/conversations/messages/:conversationId',
    { preHandler: [authentication] },
    getMessages,
  )

  // Adição de usuários em conversas
  app.post(
    '/conversations/add-user/:conversationId',
    { preHandler: [authentication] },
    addUserToConversation,
  )

  // Busca de usuários em conversas
  app.get(
    '/conversations/users/:conversationId',
    { preHandler: [authentication] },
    getUsersInConversation,
  )
}

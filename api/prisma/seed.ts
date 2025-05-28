import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Cria usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password_digest: await hash('12345678', 10),
    }
  })

  // Corrigido: usar prisma.conversation (minúsculo)
  const globalConversation = await prisma.conversation.upsert({
    where: { id: 'global_chat_id' },
    update: {},
    create: {
      id: 'global_chat_id',
      isGlobal: true,
    }
  })

  // Corrigido: usar prisma.message (minúsculo) e referência ao admin
  await prisma.message.upsert({
    where: { id: 'welcome_message' },
    update: {},
    create: {
      id: 'welcome_message',
      content: 'Bem-vindo ao superChat global!',
      senderId: admin.id,  // Usando a variável admin definida acima
      conversationId: globalConversation.id,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

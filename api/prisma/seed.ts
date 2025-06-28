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
    where: { 
      id: '76178335-291e-4537-9a94-d2f3c746c960',
      name: 'Conversa Global' 
    },
    update: {},
    create: {
      name: 'Conversa Global'
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

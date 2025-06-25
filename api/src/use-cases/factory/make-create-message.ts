import { PrismaMessagesRepository } from "@/repositories/prisma/prisma-messages-repository";
import { CreateMessageUseCase } from "../create-message";

export function makeCreateMessageUseCase() {
  const messageRepository = new PrismaMessagesRepository()
  const createMessageUseCase = new CreateMessageUseCase(messageRepository)
  return createMessageUseCase 
}

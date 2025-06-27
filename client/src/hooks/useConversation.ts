import { useQuery } from "@tanstack/react-query";
import { ConversationService } from "../services/conversationService";
import { httpCLient } from "../adapters/httpClient";

const getNewMessages = async (conversationId: string) => {
  const conversationService = new ConversationService(httpCLient);
  try {
    const response = await conversationService.getMessages({
      conversationId,
    });
    return response.messages;
  } catch (error) {
    console.error("Error fetching new messages:", error);
    throw error;
  }
};

export function useConversation(conversationId: string) {
  const {
    data: messages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getNewMessages(conversationId),
    refetchInterval: 5000,
    enabled: !!conversationId,
  });

  return { messages, error, isLoading };
}

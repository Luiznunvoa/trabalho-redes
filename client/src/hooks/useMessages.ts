import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConversationService } from "../services/conversationService";
import { httpCLient } from "../adapters/httpClient";

export function useMessages(conversationId: string) {
  const queryClient = useQueryClient();

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

  const createMessage = async (content: string) => {
    const conversationService = new ConversationService(httpCLient);
    try {
      await conversationService.createMessage({ content, conversationId});
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

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

  const { mutate: sendMessage } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  return { messages, error, isLoading, sendMessage };
}

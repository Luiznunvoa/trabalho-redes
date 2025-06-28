import { useState } from "react";
import { httpCLient } from "../adapters/httpClient";
import { ConversationService } from "../services/conversationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../stores/useUserStore";

export function useConversations(allConversations?: boolean) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const fetchConversations = async () => {
    const conversationService = new ConversationService(httpCLient);
    try {
      const response = await conversationService.getConversations({ page, allConversations });
      return response.conversations;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  };

  const addUser= async (conversationId: string) => {
    const conversationService = new ConversationService(httpCLient);
    try {
      const userId: string | null = useUserStore.getState().id;
      if (!userId) {
        throw new Error("Usuário não encontrado")
      }
      const response = await conversationService.addUser({ conversationId, userId});
      console.log(response);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      alert(error);
    }
  };

  const {
    data: conversations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", allConversations],
    queryFn: () => fetchConversations(),
    refetchInterval: 5000,
  });

  const { mutate: enterConversation } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", allConversations] });
    },
  });

  return { conversations, error, isLoading, setPage, enterConversation };
}


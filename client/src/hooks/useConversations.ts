import { useState } from "react";
import { httpCLient } from "../adapters/httpClient";
import { ConversationService } from "../services/conversationService";
import { useQuery } from "@tanstack/react-query";

export function useConversations(allConversations?: boolean) {
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

  const {
    data: conversations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", allConversations],
    queryFn: () => fetchConversations(),
    refetchInterval: 5000,
  });

  return { conversations, error, isLoading, setPage };
}


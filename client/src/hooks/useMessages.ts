import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpCLient } from "../adapters/httpClient";
import { GetMessagesResponse, MessageService } from "../services/messageService";
import { useState } from "react";

const messageService = new MessageService(httpCLient);

export function useMessages(conversationId: string) {
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = useState<number>(20);

  const getNewMessages = async (conversationId: string, pageSize?: number) => {
    try {
      const response: GetMessagesResponse = await messageService.getMessages({
        conversationId,
        page: 1,
        pageSize
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching new messages:", error);
      throw error;
    }
  };

  const createMessage = async (content: string) => {
    try {
      await messageService.createMessage({ content, conversationId });
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
    queryFn: () => getNewMessages(conversationId, pageSize),
    enabled: !!conversationId,
    refetchInterval: 5000,
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  const { mutate: loadMoreMessages } = useMutation({
    mutationFn: async () => {
      setPageSize(pageSize + 20);
      const newMessages = await getNewMessages(conversationId, pageSize);
      return newMessages;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  return { messages, error, isLoading, sendMessage, loadMoreMessages };
}


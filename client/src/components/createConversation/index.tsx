import { useState } from "react";
import { useConversations } from "../../hooks/useConversations";
import {
  CreateConversationContainer,
  Form,
  Input,
  Button,
} from "./index.styles";

export function CreateConversation() {
  const { createConversation } = useConversations();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createConversation(name);
    setName("");
  };

  return (
    <CreateConversationContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da conversa"
        />
        <Button type="submit">Criar</Button>
      </Form>
    </CreateConversationContainer>
  );
}

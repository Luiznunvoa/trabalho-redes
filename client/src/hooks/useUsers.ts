import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { httpCLient } from "../adapters/httpClient";
import { User } from "../types/profiles";
import { useUserStore } from "../stores/useUserStore"; // ajuste o path conforme necessário

const userService = new UserService(httpCLient);

// Hook para gerenciar as operações do usuário
export function useUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);

  const { data, error, refetch } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const user = await userService.profile();
      setUser({ id: user.id, name: user.name, email: user.email });
      return user;
    },
    enabled: false, // a query não é disparada automaticamente
  });

  const getProfile = async () => {
    const result = await refetch();
    if (result.data) {
      setUser({ id: result.data.id, name: result.data.name, email: result.data.email });
    } else {
      resetUser();
    }
    return result;
  };

  const createUser = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string }) =>
      userService.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      navigate("/");
    },
  });

  return {
    user: data,
    error,
    createUser: createUser.mutate,
    loading: createUser.isPending,
    getProfile,
  };
}


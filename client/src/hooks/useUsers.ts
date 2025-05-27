import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { httpCLient } from "../adapters/httpClient";
import { User } from "../types/profiles";

const userService = new UserService(httpCLient);

// Hook para gerenciar as operações do usuário
export function useUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, refetch } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: () => userService.profile(),
    enabled: false, // a query não é disparada automaticamente
  });

  const getProfile = async () => {
    return await refetch();
  };

  const createUser = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string }) =>
      userService.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      navigate("/login");
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


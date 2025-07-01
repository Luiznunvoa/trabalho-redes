import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../hooks/useUsers";
import { UserData } from "types/profiles";
import { StyledContainer, StyledContainerForm, StyledContainerHeader, StyledInput } from "../../styles/container";
import { StyledAlert, StyledAlertContaienr } from "../../styles/error_message";
import { StyledButton } from "../../styles/button";
import { Spinner } from "../../styles/spinner";

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();
  const { createUser, loading, error } = useUser()
  const onSubmit: SubmitHandler<UserData> = (data) => createUser(data)

  if (loading) {
    return <Spinner /> 
  }

  if (error) {
    return <>Erro inesperado aconteceu! Talvez o usuário já exista...</>;
  }

  return (
    <StyledContainer>
      <StyledContainerHeader>
        <h1>Crie uma Conta!</h1>
      </StyledContainerHeader>
      <StyledContainerForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome:</label>
          <StyledInput
            $hasError={errors.name ? true : false}
            id="name"
            type="text"
            {...register("name", {
              required: "⚠️ Nome é obrigatório",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                message: "⚠️ Nome inválido (somente letras e espaços são permitidos)",
              },
            })}
          />
        </div>
        <StyledAlertContaienr>
          {errors.name && <StyledAlert>{errors.name.message}</StyledAlert>}
        </StyledAlertContaienr>

        <div>
          <label htmlFor="email">Email:</label>
          <StyledInput
            $hasError={errors.email ? true : false}
            id="email"
            type="email"
            {...register("email", {
              required: "⚠️ Email é obrigatório",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "⚠️ Formato de email inválido",
              },
            })}
          />
        </div>
        <StyledAlertContaienr>
          {errors.email && <StyledAlert>{errors.email.message}</StyledAlert>}
        </StyledAlertContaienr>

        <div>
          <label htmlFor="password">Senha:</label>
          <StyledInput
            $hasError={errors.password ? true : false}
            id="password"
            type="password"
            {...register("password", { required: "⚠️ Senha é obrigatória" })}
          />
        </div>
        <StyledAlertContaienr>
          {errors.password && <StyledAlert>{errors.password.message}</StyledAlert>}
        </StyledAlertContaienr>

        <StyledButton  type="submit">Registrar</StyledButton>
        <Link to={"/login"}>Já tem conta??</Link>
      </StyledContainerForm>

    </StyledContainer>
  );
}


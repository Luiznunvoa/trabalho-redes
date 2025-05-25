import { useSession } from "../../hooks/useSession";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const { login, loading, error } = useSession();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = (
    data,
  ) => {
    login({ email: data.email, password: data.password });
  };

  if (loading) return <>Loading...</>;
  if (error)
    return (
      <>
        <p>Erro inesperado aconteceu! Verifique suas credenciais!</p>
        <a onClick={() => window.location.href = "/login"}>Voltar</a>
      </>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Formato de email inválido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Senha é obrigatória" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
      <NavLink to={"/register"}>Não tem conta??</NavLink>
    </form>
  );
}

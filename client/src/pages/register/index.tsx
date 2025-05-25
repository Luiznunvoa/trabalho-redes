import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "../../hooks/useUsers";

export function Register() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<{ name: string, email: string, password: string }>();
  const { createUser, loading, error } = useUser()

  const onSubmit: SubmitHandler<{ name: string, email: string, password: string }> = (data) => {
    createUser({ name: data.name, email: data.email, password: data.password })
  };

  if (loading) return <>Loading...</>;
  if (error) return <>Erro inesperado aconteceu! Talvez o usuário já exista...</>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "Nome é obrigatório",
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
              message: "Nome inválido (somente letras e espaços são permitidos)",
            },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

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

      <button type="submit">Registrar</button>
      <NavLink to={"/login"}>Já tem conta??</NavLink>
    </form>
    
  );
}


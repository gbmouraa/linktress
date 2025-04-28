import { useState } from "react";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import illustration from "../assets/login_illustration.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="md:flex">
      <div className="min-h-screen flex-1 bg-zinc-50 px-6 py-10 md:px-20 md:py-16">
        <div className="logo mx-auto flex max-w-[800px] items-center">
          <PiLinktreeLogoLight
            color="#000"
            className="text-[60px] md:text-[48px]"
          />
          <span className="logo select-none text-4xl font-light md:text-3xl">
            Linktress
          </span>
        </div>
        <div className="mt-8 md:text-center">
          <h1 className="text-3xl font-bold">Bem vindo de volta</h1>
          <p className="text-zinc-600">
            Acesse sua conta com seu email e senha
          </p>
        </div>
        <form className="mx-auto mt-8 w-full max-w-[800px]">
          <fieldset className="mb-3 flex flex-col gap-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="rounded-md border border-zinc-300 bg-transparent p-3 font-medium text-zinc-600 outline-none"
              placeholder="Digite seu email"
            />
          </fieldset>
          <fieldset className="mb-3 flex flex-col gap-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="rounded-md border border-zinc-300 bg-transparent p-3 font-medium text-zinc-600 outline-none"
              placeholder="Digite sua senha"
            />
          </fieldset>
          <button
            disabled={!isFormValid}
            type="submit"
            className={`w-full rounded-full bg-indigo-600 py-4 text-white transition-colors hover:bg-indigo-600/70 ${!isFormValid && "bg-zinc-300 hover:bg-zinc-300"}`}
          >
            Entrar
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm font-bold">
            Novo por aqui?{" "}
            <Link to="/register" className="text-indigo-600 underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden w-[35%] flex-col bg-black md:flex">
        <figure className="pb-20 pt-10">
          <img src={illustration} alt="Imagem ilustrativa" />
          <figcaption className="sr-only">
            Imagem ilustrativa de usuários fictícios do linktress.
          </figcaption>
        </figure>
        <div className="ml-8">
          <h2 className="block max-w-[260px] text-[32px] font-bold text-white">
            O link mais poderoso para sua bio
          </h2>
          <small className="mt-[35px] block max-w-[230px] text-sm font-medium text-zinc-300">
            Crie sua loja de criador. Possua e aumente seu público.
          </small>
        </div>
      </div>
    </div>
  );
};

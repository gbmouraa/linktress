import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase-connection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/email-validation";
import illustration from "../assets/login_illustration.png";
import { toast } from "react-toastify";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isFormValid = isValidEmail(email) && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Erro ao fazer login. Tente novamente.");
      } else {
        console.error("Unknow error:", error);
        toast.error("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            {email && !isValidEmail(email) && (
              <span className="text-sm text-red-500">
                Insira um email válido
              </span>
            )}
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
            onClick={handleSubmit}
            className={`flex w-full justify-center rounded-full bg-indigo-600 py-4 text-white transition-colors hover:bg-indigo-600/70 ${!isFormValid && "bg-zinc-300 hover:bg-zinc-300"}`}
          >
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            ) : (
              "Entrar"
            )}
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

import { useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { LoginTitle } from "../components/login-title";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase-connection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { isValidEmail } from "../utils/email-validation";
import { toast } from "react-toastify";
import { LoginIllustration } from "../components/login-illustration";
import { getUserProfile } from "../utils/firebase";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { changeUser, userStorage } = useContext(UserContext);

  const navigate = useNavigate();

  const isFormValid = isValidEmail(email) && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCrendital = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCrendital.user;

      const snapshot = await getUserProfile(user.displayName!);

      const userData = {
        uid: user.uid,
        username: user.displayName,
        name: snapshot!.name,
        profileImageURL: snapshot!.profileImageURL,
      };

      changeUser(userData);
      userStorage(userData);
      navigate("/admin");
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
        <LoginTitle
          title="Bem vindo de volta"
          subTitle="Acesse sua conta com seu email e senha"
        />
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
      <LoginIllustration />
    </div>
  );
};

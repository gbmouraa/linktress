import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "@/utils/email-validation";
import { addUserToFirebase, getUserNamesInCollection } from "@/utils/firebase";
import { auth } from "@/services/firebase-connection";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user-context";
import { LoginTitle } from "../components/login-title";
import { LoginIllustration } from "../components/login-illustration";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isUsernameAvailable, setIsUserNameAvailable] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { changeUid, changeUserName } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (username.trim() !== "") {
      validateUsername();
    }
  }, [username]);

  const userNameIsAvailable = async () => {
    const userNamesList = await getUserNamesInCollection();
    if (userNamesList.indexOf(username) !== -1) {
      return false;
    }
    return true;
  };

  const validateUsername = async () => {
    const isAvailable = await userNameIsAvailable();
    setIsUserNameAvailable(isAvailable);
  };

  const isFormValid =
    isValidEmail(email) &&
    isUsernameAvailable &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await addUserToFirebase(username, user.uid, email);
      await updateProfile(user, {
        displayName: username,
      });

      changeUid(user.uid);
      changeUserName(username);
      navigate("/admin");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Erro ao criar conta. Tente novamente.");
      } else {
        console.error("Unknown error:", error);
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
          title="Crie sua conta"
          subTitle="Crie sua conta para começar a usar o Linktress. É rápido e fácil!"
        />
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 w-full max-w-[800px]"
        >
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
            <label htmlFor="email" className="text-sm font-medium">
              Nome de usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              className="rounded-md border border-zinc-300 bg-transparent p-3 font-medium text-zinc-600 outline-none"
              placeholder="Digite um nome de usuário"
            />

            {!isUsernameAvailable && (
              <span className="text-sm text-red-500">
                Nome de usuário já está em uso
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
          <fieldset className="mb-3 flex flex-col gap-y-1">
            <label htmlFor="confirm_password" className="text-sm font-medium">
              Confirme sua senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm_password"
              name="confirm_password"
              className="rounded-md border border-zinc-300 bg-transparent p-3 font-medium text-zinc-600 outline-none"
              placeholder="Digite sua senha"
            />
            {password !== confirmPassword && (
              <span className="text-sm text-red-500">
                As senhas não são iguais
              </span>
            )}
          </fieldset>
          <button
            disabled={!isFormValid}
            type="submit"
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
            Já possui uma conta?{" "}
            <Link to="/login" className="text-indigo-600 underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
      <LoginIllustration />
    </div>
  );
};

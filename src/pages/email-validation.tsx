import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginIllustration } from "../components/login-illustration";
import { LoginTitle } from "../components/login-title";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase-connection";

export const EmailValidation = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [emailVerified, setEmailVerified] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (auth.currentUser?.reload()) {
      if (auth.currentUser?.emailVerified) {
        setEmailVerified(true);

        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (seconds === 0) return;
    if (emailVerified) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, emailVerified]);

  const handleSendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  return (
    <div className="md:flex">
      <div className="min-h-screen flex-1 bg-zinc-50 px-6 py-10 md:px-20 md:py-16">
        <LoginTitle
          title={
            emailVerified
              ? "Email verficado com sucesso!"
              : "Verifique seu email"
          }
          subTitle={
            emailVerified
              ? "Redirecionando para dashboard..."
              : `Para prosseguir por favor confirme seu email através do link que enviamos para ${email}, verifique também sua caixa de spam.`
          }
        />
        {!emailVerified ? (
          <div>
            <p className="my-3 md:text-center">
              <span>Não recebeu o email?</span>
              {seconds !== 0 && (
                <span> Enviar email novamente em {seconds}</span>
              )}
            </p>
            <button
              className={`flex w-full justify-center rounded-full bg-indigo-600 py-4 text-white transition-colors hover:bg-indigo-600/70 ${seconds !== 0 && "bg-zinc-300 hover:bg-zinc-300"}`}
              disabled={seconds !== 0}
              onClick={handleSendVerification}
            >
              Enviar novamente
            </button>
          </div>
        ) : (
          <div className="mt-3 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-500"></div>
          </div>
        )}
      </div>
      <LoginIllustration />
    </div>
  );
};

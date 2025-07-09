import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginIllustration } from "../components/login-illustration";
import { LoginTitle } from "../components/login-title";
import { sendEmailVerification, ActionCodeSettings } from "firebase/auth";
import { auth } from "../services/firebase-connection";

export const EmailValidation = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(30);

  const actionCodeSettings: ActionCodeSettings = {
    url: "https://linktress-pied.vercel.app/admin.com",
    handleCodeInApp: true,
  };

  const handleSendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
    }
  };

  useEffect(() => {
    handleSendVerification();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          navigate("/admin");
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="md:flex">
      <div className="min-h-screen flex-1 bg-zinc-50 px-6 py-10 md:px-20 md:py-16">
        <LoginTitle
          title="Verifique seu email"
          subTitle={`Para prosseguir por favor confirme seu email através do link que enviamos para ${email}, verifique também sua caixa de spam.`}
        />
        <div>
          <p className="my-3 md:text-center">
            <span>Não recebeu o email?</span>
            {seconds !== 0 && <span> Enviar email novamente em {seconds}</span>}
          </p>
          <button
            className={`flex w-full justify-center rounded-full bg-indigo-600 py-4 text-white transition-colors hover:bg-indigo-600/70 ${seconds !== 0 && "bg-zinc-300 hover:bg-zinc-300"}`}
            disabled={seconds !== 0}
            onClick={handleSendVerification}
          >
            Enviar novamente
          </button>
        </div>
      </div>
      <LoginIllustration />
    </div>
  );
};

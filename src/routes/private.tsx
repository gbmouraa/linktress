import { ReactNode, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../components/loading-animation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase-connection";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const { user, changeUser, isLoadingUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        changeUser(null);
        localStorage.removeItem("@linktress");
      } else if (firebaseUser && !firebaseUser.emailVerified) {
        navigate(
          `/email-validation/${encodeURIComponent(firebaseUser.email!)}`,
        );
      }
    });

    return () => unsub();
  }, [changeUser, navigate]);

  if (isLoadingUser) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

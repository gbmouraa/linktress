import { ReactNode, useContext, useEffect } from "react";
import { UserContext } from "../contexts/user-context";
import { Navigate } from "react-router-dom";
import { LoadingAnimation } from "../components/loading-animation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase-connection";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const { user, changeUser, isLoadingUser } = useContext(UserContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (hasUser) => {
      if (!hasUser) {
        changeUser(null);
        localStorage.removeItem("@linktress");
      }
    });

    return () => unsub();
  }, [changeUser]);

  if (isLoadingUser) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

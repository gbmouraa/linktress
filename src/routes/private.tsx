import { useState, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/services/firebase-connection";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingAnimation } from "../components/loading-animation";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!isSignedIn) {
    return <Navigate to={"/"} />;
  }

  return children;
};

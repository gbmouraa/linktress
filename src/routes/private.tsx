import { ReactNode, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { Navigate } from "react-router-dom";
import { LoadingAnimation } from "../components/loading-animation";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
  const { user, isLoadingUser } = useContext(UserContext);

  if (isLoadingUser) {
    return <LoadingAnimation />;
  }

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

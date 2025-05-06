import { ReactNode, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getUserNamesInCollection } from "../utils/firebase";
import { LoadingAnimation } from "../components/loading-animation";

// const pageData = {
//   backgorund,
//   ImTextColor,
//   links: [{ name, url }, socialMedias],
// };

interface ProfileRouteProps {
  children: ReactNode;
}

export const ProfileRoute = ({ children }: ProfileRouteProps) => {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const { profile } = useParams();

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const userNames = await getUserNamesInCollection();
        setUserExists(userNames.includes(profile!));
      } catch (error) {
        console.error("Usuário não encontrado:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserExists();
  }, [profile]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return userExists ? children : <Navigate to="/" />;
};

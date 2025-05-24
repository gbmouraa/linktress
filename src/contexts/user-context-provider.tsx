import { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./user-context";
import { UserType } from "../types";

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("@linktress");

    if (userStorage) {
      setUser(JSON.parse(userStorage) as UserType);
      navigate("/admin");
    }

    setIsLoadingUser(false);
  }, []);

  const changeUser = (userData: UserType | null) => {
    setUser(userData);
  };

  const userStorage = (user: UserType) => {
    localStorage.setItem("@linktress", JSON.stringify(user));
  };

  return (
    <UserContext.Provider
      value={{ user, changeUser, userStorage, isLoadingUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

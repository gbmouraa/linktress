import { createContext } from "react";
import { UserType } from "../types";

export type UserContextData = {
  user: UserType | null;
  changeUser: (userData: UserType | null) => void;
  // função para alterar dados no localStorage
  userStorage: (user: UserType) => void;
  isLoadingUser: boolean;
};

export const UserContext = createContext({} as UserContextData);

import { createContext } from "react";

export type UserContextData = {
  uid: string;
  changeUid: (uid: string) => void;
  username: string;
  changeUserName: (Username: string) => void;
  name: string;
  changeName: (name: string) => void;
  profileImageURL: string | null;
  changeProfileImageURL: (url: string) => void;
};

export const UserContext = createContext({} as UserContextData);

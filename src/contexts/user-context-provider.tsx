import { useState, ReactNode } from "react";
import { UserContext } from "./user-context";

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profileImageURL, setProfileImageURL] = useState<null | string>(null);

  const changeUid = (uid: string) => {
    setUid(uid);
  };

  const changeUserName = (username: string) => {
    setUsername(username);
  };

  const changeName = (name: string) => {
    setName(name);
  };

  const changeProfileImageURL = (url: string) => {
    setProfileImageURL(url);
  };

  return (
    <UserContext.Provider
      value={{
        uid,
        changeUid,
        username,
        changeUserName,
        name,
        changeName,
        profileImageURL,
        changeProfileImageURL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { db } from "../services/firebase-connection";
import { setDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";
import { UserProfileType } from "../types";

// função para adicionar os dados do usuário na collection "users"
export const addUserToFirebase = async (
  username: string,
  uid: string,
  email: string,
) => {
  const userProfileData = {
    uid: uid,
    username: username,
    email: email,
    linkColor: "#000",
    linkBg: "#fff",
    pageBg: "#000",
    profileImageURL: null,
    name: null,
    bio: null,
    facebookURL: null,
    tiktokURL: null,
    youtubeURL: null,
  };

  await setDoc(doc(db, "users", username), {
    ...userProfileData,
  });
};

export const getUserNamesInCollection = async (): Promise<string[]> => {
  try {
    const collectionRef = collection(db, "users");
    const snapshot = await getDocs(collectionRef);

    const userNamesList = snapshot.docs.map((doc) => doc.id);
    return userNamesList;
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    throw error;
  }
};

export const getUserProfile = async (username: string) => {
  const docRef = doc(db, "users", username);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data() as UserProfileType;
  } else {
    return null;
  }
};

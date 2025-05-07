import { db } from "../services/firebase-connection";
import { setDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";

// função para adicionar os dados do usuário na collection "users"
export const addUserToFirebase = async (
  username: string,
  uid: string,
  email: string,
) => {
  await setDoc(doc(db, "users", username), {
    uid: uid,
    username: username,
    email: email,
    linkColor: "#000",
    linkBg: "#fff",
    pageBg: "#000",
    profileImageURL: "",
    name: "",
    bio: "",
    facebookURL: "",
    tiktokURL: "",
    youtubeURL: "",
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

  try {
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  } catch (error) {
    console.error("Não foi possivél carregar este perfil:", error);
  }
};

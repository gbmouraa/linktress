import { db } from "../services/firebase-connection";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

export const addUserToFirebase = async (
  username: string,
  uid: string,
  email: string,
) => {
  await setDoc(doc(db, "users", username), {
    uid: uid,
    username: username,
    email: email,
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

import { useState, useContext, FormEvent, useRef } from "react";
import { UserContext } from "../contexts/user-context";
import { storage, db } from "../services/firebase-connection";
import { doc, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { EditPageTitle } from "./edit-page-title";
import headerIcon from "@/assets/edit-page-icons/header.svg";
import { FaUserCircle } from "react-icons/fa";
import { UserProfileType } from "../types";

interface EditHeaderProps {
  data: UserProfileType | null;
}

export const EditPageHeader = ({ data }: EditHeaderProps) => {
  const [profileImgPreview, setProfileImagePreview] = useState<null | string>(
    null,
  );
  const [image, setImage] = useState<null | File>(null);
  const [removeImgFromDB, setRemoveImgFromDB] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user, changeUser, userStorage } = useContext(UserContext);

  const handleFile = (item: React.ChangeEvent<HTMLInputElement>) => {
    if (item.target.files && item.target.files[0]) {
      const imageFile = item.target.files[0];

      if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
        setImage(imageFile);
        setProfileImagePreview(URL.createObjectURL(imageFile));
      } else {
        alert("Insira uma imagem do tipo JPEG ou PNG");
        setProfileImagePreview(null);
      }
    }
  };

  const handleUpload = async () => {
    const uploadRef = ref(
      storage,
      `profile-images/${user!.uid}/${image!.name}`,
    );

    try {
      const uploadTask = await uploadBytes(uploadRef, image!);
      const snapshotRef = uploadTask.ref;
      const downloadURL = await getDownloadURL(snapshotRef);
      const imageURL = downloadURL;

      await setDoc(doc(db, "users", data!.username), {
        ...data,
        profileImageURL: imageURL,
      });

      changeUser({ ...user!, profileImageURL: imageURL });
      userStorage({ ...user!, profileImageURL: imageURL });
    } catch (error) {
      console.error("Não foi possivél fazer as alterações:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await handleUpload();
      toast("Sucesso", {
        description: "Sua foto de perfil foi atualizada",
        action: {
          label: "Entendi",
          onClick: () => {},
        },
      });
      setProfileImagePreview(null);
    } catch (error) {
      console.error("Não foi póssivel atualizar sua imagem:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleRemoveImg = async () => {
    if (!profileImgPreview && !user!.profileImageURL) return;

    if (profileImgPreview) {
      setProfileImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (user!.profileImageURL) {
      setRemoveImgFromDB(true);

      const url = user!.profileImageURL;
      const lastPart = url.split("/").pop() || "";
      const imagePath = decodeURIComponent(lastPart.split("?")[0]);
      const imageName = imagePath.split("/").pop();

      const imageRef = ref(storage, `profile-images/${user!.uid}/${imageName}`);

      try {
        await deleteObject(imageRef);
        if (user?.username) {
          await setDoc(
            doc(db, "users", user!.username),
            {
              profileImageURL: null,
            },
            { merge: true },
          );
        } else {
          console.error("userStorage.username is null or undefined");
        }
        changeUser({ ...user!, profileImageURL: null });
        userStorage({ ...user!, profileImageURL: null });
      } catch (error) {
        console.error("Erro ao deletar imagem do banco de dados:", error);
      } finally {
        setRemoveImgFromDB(false);
      }
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-xl bg-zinc-100 p-6"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <EditPageTitle img={headerIcon} title="Cabeçalho da página" />
        </AccordionTrigger>
        <AccordionContent>
          <form className="mt-6" onSubmit={handleSubmit}>
            <fieldset>
              <span className="text-base font-medium">Foto de Perfil</span>
              <div className="mt-4 flex gap-x-4">
                <div>
                  {profileImgPreview ? (
                    <img
                      src={profileImgPreview}
                      alt="Imagem do usuário"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : user?.profileImageURL ? (
                    <img
                      src={user.profileImageURL}
                      alt="Imagem do usuário"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle size={96} className="text-zinc-200" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block w-full max-w-[432px] cursor-pointer rounded-full bg-black py-[10px] text-center text-white">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFile}
                      ref={fileInputRef}
                    />
                    Escolher uma imagem
                  </label>
                  <button
                    type="button"
                    className="mt-2 block h-10 w-full max-w-[432px] cursor-pointer rounded-full border border-black bg-transparent py-[10px] text-center"
                    onClick={handleRemoveImg}
                    disabled={removeImgFromDB}
                  >
                    {removeImgFromDB ? (
                      <div className="mx-auto h-5 w-5 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
                    ) : (
                      "Remover"
                    )}
                  </button>
                  <button
                    type="submit"
                    className="ml-auto mt-3 block min-w-[90px] rounded-full bg-indigo-600 px-6 py-[10px] text-white disabled:cursor-not-allowed"
                    disabled={isSending || !profileImgPreview}
                  >
                    {isSending ? (
                      <div className="mx-auto h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

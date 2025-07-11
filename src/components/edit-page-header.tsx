import { useState, useContext, FormEvent, useRef, useEffect } from "react";
import { UserContext } from "../contexts/user-context";
import { storage, db } from "../services/firebase-connection";
import { doc, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { EditPageTitle } from "./edit-page-title";
import headerIcon from "@/assets/edit-page-icons/header.svg";
import { FaUserCircle } from "react-icons/fa";
import { UserProfileType } from "../types";

interface EditHeaderProps {
  data: UserProfileType;
}

export const EditPageHeader = ({ data }: EditHeaderProps) => {
  const { user, changeUser, userStorage } = useContext(UserContext);

  const [profileImgPreview, setProfileImagePreview] = useState<null | string>(
    null,
  );
  const [image, setImage] = useState<null | File>(null);
  const [removeImgFromDB, setRemoveImgFromDB] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [profileName, setProfileName] = useState(data?.name || "");
  const [bio, setBio] = useState(data?.bio || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfileName(data?.name || "");
    setBio(data?.bio || "");
  }, [data]);

  const isProfileNameChanged = profileName !== (data?.name || "");
  const isBioChanged = bio !== (data?.bio || "");

  const isFormChanged =
    !!profileImgPreview || isProfileNameChanged || isBioChanged;

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
    if (!profileImgPreview) return;

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

  const updateProfileNameAndBio = async () => {
    if (profileName.trim() === "" && bio.trim() === "") return;

    if (user?.username) {
      try {
        await setDoc(
          doc(db, "users", user.username),
          {
            name: profileName,
            bio: bio,
          },
          { merge: true },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await handleUpload();
      await updateProfileNameAndBio();
      toast("Sucesso", {
        description: "Seu perfil foi atualizado",
        action: {
          label: "Entendi",
          onClick: () => {},
        },
      });
      setProfileImagePreview(null);
    } catch (error) {
      console.error("Não foi póssivel atualizar seu perfil:", error);
      toast("Erro", {
        description: "Não foi póssivel atualizar seu perfil, tente novamente",
        action: {
          label: "Entendi",
          onClick: () => {},
        },
      });
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
    <>
      <AccordionTrigger>
        <EditPageTitle img={headerIcon} title="Cabeçalho da página" />
      </AccordionTrigger>
      <AccordionContent className="data-[state=closed]">
        <form className="mt-6" onSubmit={handleSubmit}>
          <fieldset className="mb-6">
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
              </div>
            </div>
          </fieldset>
          <fieldset className="mb-3">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-base font-medium"
            >
              Nome do perfil
            </label>
            <input
              type="text"
              id="profile-name"
              className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-3 focus:border-2 focus:border-black"
              placeholder="Digite o nome do seu perfil"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="bio" className="mb-2 block text-base font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              className="max-h-[200px] min-h-[150px] w-full rounded-lg border border-zinc-300 bg-white px-2 py-3 focus:border-2 focus:border-black"
              placeholder="Digite a bio do seu perfil"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <button
            type="submit"
            className="ml-auto mt-3 block min-w-[90px] rounded-full bg-indigo-600 px-6 py-[10px] text-white disabled:cursor-not-allowed"
            disabled={!isFormChanged || isSending}
          >
            {isSending ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            ) : (
              "Salvar"
            )}
          </button>
        </form>
      </AccordionContent>
    </>
  );
};

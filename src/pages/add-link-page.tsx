import { useState, useContext, FormEvent } from "react";
import { UserContext } from "../contexts/user-context";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import linkIcon from "@/assets/edit-page-icons/link_icon.svg";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../services/firebase-connection";
import { toast } from "sonner";

export const AddLinkPage = () => {
  const [isValidLink, setIsValidLink] = useState(false);
  const [url, setUrl] = useState("");
  const [linkName, setLinkName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addLink = async () => {
    if (user?.username) {
      setIsLoading(true);
      const docRef = doc(db, "users", user.username);
      const linksCollectionRef = collection(docRef, "links");

      try {
        await addDoc(linksCollectionRef, {
          name: linkName,
          url: url,
        });
        toast("Sucesso", {
          description: "Link adicionado com sucesso",
          action: {
            label: "Entendi",
            onClick: () => {},
          },
        });
      } catch (error) {
        console.error(error);
        toast("Erro", {
          description: "Não foi possível adicionar o link, tente novamente",
          action: {
            label: "Entendi",
            onClick: () => {},
          },
        });
      } finally {
        setIsLoading(false);
        setLinkName("");
        setUrl("");
        setIsValidLink(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsValidLink(isValidUrl(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addLink();
  };

  return (
    <div>
      <main className="mx-auto w-full max-w-[464px] px-5 pb-10 pt-6">
        <Link
          to="/admin/edit-page"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200"
        >
          <IoMdClose color="#000" size={22} />
        </Link>
        <div className="mt-8 space-y-2">
          <img src={linkIcon} alt="Icon" width={40} />
          <h1 className="text-2xl font-medium">Adicionar botão de link</h1>
          <form onSubmit={handleSubmit}>
            <label className="mb-4 block">
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-3 focus:border-2 focus:border-black"
                placeholder="Nome do link"
                onChange={(e) => setLinkName(e.target.value)}
                value={linkName}
              />
              {isValidLink && linkName.trim().length === 0 && (
                <span className="text-sm text-red-500">
                  Insira um nome para o link
                </span>
              )}
            </label>
            <label className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-3 focus:border-2 focus:border-black"
                placeholder="URL"
                onChange={handleChange}
                value={url}
              />
              {url.trim().length !== 0 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1"
                  onClick={() => setUrl("")}
                >
                  <IoMdClose size={20} />
                </button>
              )}
            </label>
            {url !== "" && !isValidLink && (
              <span className="text-sm text-red-500">
                Insira um link válido
              </span>
            )}
            <button
              className={`mt-10 w-full rounded-lg py-3 text-center font-bold text-white ${isValidLink && linkName !== "" ? "bg-black" : "cursor-not-allowed bg-zinc-200"}`}
              disabled={!isValidLink}
            >
              {isLoading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
              ) : (
                "Criar link"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

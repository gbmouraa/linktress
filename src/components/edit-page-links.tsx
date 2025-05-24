import { useState, useEffect, useContext, FormEvent } from "react";
import { UserContext } from "../contexts/user-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { EditPageTitle } from "./edit-page-title";
import linkIcon from "@/assets/edit-page-icons/link_button.svg";
import { UserProfileType } from "../types";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase-connection";
import { toast } from "sonner";

interface EditPageLinksProps {
  data: UserProfileType;
}

export const EditPageLinks = ({ data }: EditPageLinksProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkBgColor, setLinkBgColor] = useState(data.linkBg);
  const [linkTextColor, setLinkTextColor] = useState(data.linkColor);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setLinkBgColor(data.linkBg);
    setLinkTextColor(data.linkColor);
  }, [data.linkBg, data.linkColor]);

  const isFormChanged =
    linkBgColor !== data.linkBg || linkTextColor !== data.linkColor;

  const changeLinkColors = async () => {
    if (user?.username) {
      setIsLoading(true);
      try {
        await setDoc(
          doc(db, "users", user.username),
          {
            linkBg: linkBgColor,
            linkColor: linkTextColor,
          },
          {
            merge: true,
          },
        );
        toast("Sucesso", {
          description: "Alterações feitas com sucesso",
          action: {
            label: "Entendi",
            onClick: () => {},
          },
        });
      } catch (error) {
        console.error("Não foi possível fazer as alterações:", error);
        toast("Erro", {
          description: "Não foi possível fazer as alterações, tente novamente",
          action: {
            label: "Entendi",
            onClick: () => {},
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await changeLinkColors();
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-xl bg-zinc-100 p-6"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <EditPageTitle img={linkIcon} title="Links" />
        </AccordionTrigger>
        <AccordionContent>
          <form className="mt-6 flex flex-wrap gap-6" onSubmit={handleSubmit}>
            <label htmlFor="" className="flex-col">
              <span className="block text-base font-medium">Cor de Fundo</span>
              <input
                type="color"
                className="block h-10 w-[100px] rounded"
                value={linkBgColor}
                onChange={(e) => setLinkBgColor(e.target.value)}
              />
            </label>
            <label htmlFor="" className="flex-col">
              <span className="block text-base font-medium">Cor do Texto</span>
              <input
                type="color"
                className="block h-10 w-[100px] rounded"
                value={linkTextColor}
                onChange={(e) => setLinkTextColor(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="ml-auto mt-3 block h-10 min-w-[90px] self-end rounded-full bg-indigo-600 px-6 py-[10px] text-white disabled:cursor-not-allowed"
              disabled={!isFormChanged || isLoading}
            >
              {isLoading ? (
                <div className="mx-auto h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
              ) : (
                "Salvar"
              )}
            </button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

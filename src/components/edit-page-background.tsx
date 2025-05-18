import { FormEvent, useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { EditPageTitle } from "./edit-page-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import bgIcon from "@/assets/edit-page-icons/background_color.svg";
import { colors, wallpapers } from "../utils/wallpapers-values";
import { UserProfileType } from "../types";
import { db } from "../services/firebase-connection";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

interface EditPageBackgroundProps {
  data: UserProfileType;
}

type WallpaperType = {
  name: string;
  value: string;
};

export const EditPageBackground = ({ data }: EditPageBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wallpaperSelected, setWallpaperSelected] = useState(data.pageBg);

  const { user } = useContext(UserContext);

  const handleSelection = (item: WallpaperType) => {
    setWallpaperSelected(item.value);
  };

  useEffect(() => {
    setWallpaperSelected(data.pageBg);
  }, [data.pageBg]);

  const isFormChanged = wallpaperSelected !== data.pageBg;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (user?.username) {
      try {
        await setDoc(
          doc(db, "users", user?.username),
          {
            pageBg: wallpaperSelected,
          },
          {
            merge: true,
          },
        );
        toast("Sucesso", {
          description: "Plano de fundo atualizado",
          action: {
            label: "Entendi",
            onClick: () => {},
          },
        });
      } catch (error) {
        console.error(error);
        toast("Erro", {
          description:
            "Não foi possivél alterar seu plano de fundo, tente novamente",
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

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-xl bg-zinc-100 p-6"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <EditPageTitle img={bgIcon} title="Plano de fundo" />
        </AccordionTrigger>
        <AccordionContent>
          <form className="mt-6" onSubmit={handleSubmit}>
            <span className="mb-6 block pl-2 text-base font-medium">
              Selecione uma cor ou uma imagem
            </span>
            <fieldset>
              <ul className="flex flex-wrap gap-3 pl-2">
                {colors.map((item) => (
                  <li key={item.name} className="block">
                    <label
                      htmlFor={item.name}
                      className={`outline-3 block h-10 w-10 cursor-pointer rounded-full outline outline-transparent transition-colors hover:outline-zinc-400 ${wallpaperSelected === item.value ? "outline-indigo-500" : ""}`}
                      style={{
                        backgroundColor: item.value,
                        outlineColor:
                          wallpaperSelected === item.value
                            ? "#6366f1"
                            : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="background"
                        id={item.name}
                        className="sr-only"
                        value={item.value}
                        onChange={() => handleSelection(item)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset>
              <ul className="mt-6 flex flex-wrap gap-4 pl-2">
                {wallpapers.map((item) => (
                  <li key={item.name} className="block">
                    <label
                      htmlFor={item.name}
                      className={`outline-3 block cursor-pointer rounded-xl outline outline-transparent transition-colors hover:outline-zinc-400 ${wallpaperSelected === item.value ? "outline-indigo-500" : ""}`}
                      style={
                        wallpaperSelected === item.value
                          ? { outlineColor: "#6366f1" }
                          : { outlineColor: "transparent" }
                      }
                    >
                      <input
                        type="radio"
                        name="background"
                        id={item.name}
                        className="sr-only"
                        value={item.value}
                        onChange={() => handleSelection(item)}
                      />
                      <img
                        className="block w-full max-w-[150px] rounded-xl"
                        src={item.path}
                        alt="Wallpaper"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <button
              type="submit"
              className="ml-auto mt-3 block min-w-[90px] rounded-full bg-indigo-600 px-6 py-[10px] text-white disabled:cursor-not-allowed"
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

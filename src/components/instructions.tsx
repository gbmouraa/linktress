import { Link } from "react-router-dom";
import { DescriptionItem } from "./description-item";
import link from "../assets/instruction-icons/link.png";
import userCheck from "../assets/instruction-icons/user_check.png";
import pallet from "../assets/instruction-icons/pallete.png";
import megaphone from "../assets/instruction-icons/megaphone.png";

export const Instructions = () => {
  return (
    <section
      aria-label="Como criar um link na bio usando o Linktress"
      className="bg-indigo-600 px-6 py-10 text-white lg:py-20"
    >
      <h2 className="mx-auto block max-w-[730px] pb-12 text-center text-3xl font-extrabold lg:pb-20 lg:text-5xl">
        Como criar um link na bio usando o Linktress
      </h2>
      <div className="mx-auto flex max-w-[1220px] flex-col flex-wrap items-center justify-center gap-10 lg:flex-row lg:gap-y-20">
        <DescriptionItem
          img={userCheck}
          title="Passo 1: Crie sua conta"
          text="Cadastre-se e escolha um nome de usuário para sua página."
        />
        <DescriptionItem
          img={link}
          title="Passo 2: Insira seus links"
          text="Insira os links que pretende compartilhar (redes sociais, produtos, músicas etc.)."
        />
        <DescriptionItem
          img={pallet}
          title="Passo 3: Personalize sua página"
          text="Coloque todo o seu estilo e deixe o Linktress com a sua cara!"
        />
        <DescriptionItem
          img={megaphone}
          title="Passo 4: Compartilhe"
          text="Divulgue sua página, você etá pronto para compartilhar sua página atrevés do seu link."
        />
      </div>
      <div className="mt-16 flex items-center justify-center">
        <button className="rounded-full border bg-white px-6 py-3 text-2xl font-bold text-indigo-600 transition-colors hover:bg-white/80">
          <Link to="/register">Começar agora</Link>
        </button>
      </div>
    </section>
  );
};

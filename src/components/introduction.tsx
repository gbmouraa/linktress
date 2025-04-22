import { Link } from "react-router-dom";
import CardImage from "../../public/card-demonstration.png";

export const Introduction = () => {
  return (
    <section
      aria-label="Introdução do site"
      className="flex w-full justify-center bg-black px-6 pt-10 lg:pb-10 xl:px-0"
    >
      <div className="max-w-7xl justify-center lg:flex lg:items-center">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-white lg:text-left lg:text-5xl">
            Divulge seu{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              link na bio
            </span>{" "}
            em uma página exclusiva e personalizada
          </h1>
          <p className="mt-10 text-center text-zinc-200 lg:text-left lg:text-lg">
            Crie um link na bio grátis. Uma árvore de links para seu Instagram,
            TikTok, Twitter, Youtube, WhatsApp e outras redes sociais.
          </p>
          <div className="mt-10 flex w-full justify-center lg:justify-normal">
            <button className="rounded-full bg-white px-4 py-3 text-lg font-bold transition-colors hover:bg-white/80 lg:text-2xl">
              <Link to="/register">Criar link na bio</Link>
            </button>
          </div>
        </div>
        <div className="flex h-[460px] w-full justify-center overflow-hidden py-10 lg:h-auto lg:py-0">
          <img
            src={CardImage}
            alt="Imagem de demonstração perfil Linktress"
            className="h-[560px]"
          />
        </div>
      </div>
    </section>
  );
};

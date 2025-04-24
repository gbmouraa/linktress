import { DescriptionItem } from "./description-item";
import bag from "../assets/description-icons/bag.png";
import camera from "../assets/description-icons/camera.png";
import tag from "../assets/description-icons/tag.png";
import link from "../assets/description-icons/link.png";
import whatsapp from "../assets/description-icons/whatsapp.png";
import graph from "../assets/description-icons/graph.png";

export const Description = () => {
  return (
    <section
      aria-label="Descriçao do site"
      className="bg-zinc-50 px-6 py-10 lg:py-20"
    >
      <h2 className="mx-auto block max-w-[730px] pb-12 text-center text-3xl font-extrabold lg:pb-20 lg:text-5xl">
        Tudo que você faz, cria e vende, reunidos em um único link na bio.
      </h2>
      <div className="mx-auto flex max-w-[1220px] flex-col flex-wrap items-center justify-center gap-10 lg:flex-row lg:gap-y-20">
        <DescriptionItem
          img={tag}
          title="Compartilhe suas redes sociais"
          text="Reúna todas as suas redes sociais e divulgue em um único link na
              bio."
        />
        <DescriptionItem
          img={bag}
          title="Divulgue seus produtos e serviços"
          text="Transforme seus seguidores em clientes levando-os para sua loja
                ou cardápio."
        />
        <DescriptionItem
          img={link}
          title="Promova seus links de afiliados"
          text="Use o Linktress para aumentar as vendas dos seus produtos
                afiliados."
        />
        <DescriptionItem
          img={camera}
          title="Divulgue seus conteúdos"
          text="Use o link na bio para divulgar vídeos, músicas, podcasts,
                ebooks, aulas, newletters e etc."
        />
        <DescriptionItem
          img={whatsapp}
          title="Leve mais clientes para o WhatsApp"
          text="Aproveite nosso gerador de links para levar seus links
                seguidores até o WhatsApp."
        />
        <DescriptionItem
          img={graph}
          title="Aumente os leads do seu negócio"
          text="Capture mais leads usando o Sandwiche para divulgar
                recompensas, eventos e lançamentos."
        />
      </div>
    </section>
  );
};

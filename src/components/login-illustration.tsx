import illustration from "../assets/login_illustration.png";

export const LoginIllustration = () => {
  return (
    <div className="hidden w-[35%] flex-col bg-black md:flex">
      <figure className="pb-20 pt-10">
        <img src={illustration} alt="Imagem ilustrativa" />
        <figcaption className="sr-only">
          Imagem ilustrativa de usuários fictícios do linktress.
        </figcaption>
      </figure>
      <div className="ml-8">
        <h2 className="block max-w-[260px] text-[32px] font-bold text-white">
          O link mais poderoso para sua bio
        </h2>
        <small className="mt-[35px] block max-w-[230px] text-sm font-medium text-zinc-300">
          Crie sua loja de criador. Possua e aumente seu público.
        </small>
      </div>
    </div>
  );
};

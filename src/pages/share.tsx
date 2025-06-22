import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import QRCode from "react-qr-code";
import { CopyProfileLinkButton } from "../components/copy-profile-link-button";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { LoadingAnimation } from "../components/loading-animation";
import whatsappIcon from "../assets/whatsapp_colored.svg";
import emailIcon from "../assets/email_colored.svg";

export const Share = () => {
  const { user } = useContext(UserContext);

  if (!user?.username) {
    return <LoadingAnimation dark />;
  }

  return (
    <div className="h-screen w-full bg-black">
      <div className="relative m-auto flex w-full max-w-xs flex-col items-center bg-black pt-16">
        <div className="mb-3">
          <QRCode
            size={180}
            value={`https://linktress-pied.vercel.app/linktress/${user?.username}`}
          />
          <div className="absolute right-0 top-16">
            <Link
              to="/admin"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600/40"
            >
              <IoMdClose color="#fff" size={20} />
            </Link>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-y-4 px-4">
          <span className="text-center font-medium text-zinc-300">
            Meu link Linktress{" "}
          </span>
          <span className="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap font-medium text-white">{`https://linktress-pied.vercel.app/linktress/${user.username}`}</span>
          <CopyProfileLinkButton username={user.username} />
        </div>
        <div className="mt-6 flex flex-col items-center gap-y-6">
          <span className="font-medium text-white">Compartilhe seu perfil</span>
          <div className="flex items-center justify-center gap-x-6">
            <a
              href={`https://api.whatsapp.com/send/?text=${encodeURIComponent(
                `https://linktress-pied.vercel.app/linktress/${user.username}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsappIcon} alt="Whatsapp logo" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                "Veja meu perfil no Linktress",
              )}&body=${encodeURIComponent(
                `Acesse meu perfil: https://linktress-pied.vercel.app/linktress/${user.username}`,
              )}`}
            >
              <img src={emailIcon} alt="Email icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

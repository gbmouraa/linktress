import { PiLinktreeLogoLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex justify-center bg-black">
      <header className="flex w-full items-center justify-between p-6">
        <div className="flex items-center">
          <PiLinktreeLogoLight color="#fff" size={40} />
          <span className="logo text-2xl font-light text-zinc-100">
            Linktress
          </span>
        </div>
        <button className="rounded-xl bg-white px-4 py-2 text-sm font-bold transition-colors hover:bg-white/80">
          <Link to="/login">Entrar</Link>
        </button>
      </header>
    </div>
  );
};

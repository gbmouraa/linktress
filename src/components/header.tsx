import { PiLinktreeLogoLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex justify-center bg-black">
      <header className="flex w-full max-w-7xl items-center justify-between p-6 xl:px-0">
        <div className="flex items-center">
          <PiLinktreeLogoLight color="#fff" size={40} />
          <span className="logo select-none text-2xl font-light text-zinc-100">
            Linktress
          </span>
        </div>
        <Link
          to="/login"
          className="rounded-xl bg-white px-4 py-2 text-sm font-bold transition-colors hover:bg-white/80 lg:text-lg"
        >
          Entrar
        </Link>
      </header>
    </div>
  );
};

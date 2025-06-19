import { PiLinktreeLogoLight } from "react-icons/pi";
import { DropdownMenuAdminHeader } from "./dropdown-menu-admin-header";
import { IoShareOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 pt-3 md:pl-0 md:pt-0">
      <div className="logo flex items-center md:w-[300px] md:border-b-2 md:border-r-2 md:py-4 md:pl-8">
        <PiLinktreeLogoLight color="#000" size={28} />
        <span className="logo hidden select-none text-xl font-light md:inline-block">
          Linktress
        </span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <Link
            to="/admin/share"
            className="flex cursor-pointer items-center gap-x-1 rounded-full bg-zinc-100 px-3 py-2 transition-colors hover:bg-zinc-200"
          >
            <IoShareOutline size={18} />
            <span className="text-xs">Compartilhar</span>
          </Link>
          <DropdownMenuAdminHeader />
        </div>
      </div>
    </header>
  );
};

import { PiLinktreeLogoLight } from "react-icons/pi";
import { DropdownMenuAdminHeader } from "./dropdown-menu-admin-header";

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
        <div className="flex items-center">
          <DropdownMenuAdminHeader />
        </div>
      </div>
    </header>
  );
};

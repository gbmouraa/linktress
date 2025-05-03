import { Link } from "react-router-dom";
import homeIcon from "@/assets/menu-icons/home_menu_icon.svg";
import customizeIcon from "@/assets/menu-icons/customize_page_menu.svg";
import pencilIcon from "@/assets/menu-icons/edit_sdwc_menu.svg";

export const Nav = () => {
  return (
    <nav className="hidden h-screen w-[300px] border-r-2 p-8 md:block">
      <ul className="flex flex-col space-y-4">
        <li className="rounded-full transition-colors hover:bg-zinc-100">
          <Link
            to="/admin"
            className="flex h-full w-full items-center gap-x-2 py-3 pl-8 text-sm"
          >
            <img src={homeIcon} alt="home icon" />
            Home
          </Link>
        </li>
        <li className="rounded-full transition-colors hover:bg-zinc-100">
          <Link
            to="/admin/edit"
            className="flex h-full w-full items-center gap-x-2 py-3 pl-8 text-sm"
          >
            <img src={pencilIcon} alt="pencil icon" />
            Editar linktress
          </Link>
        </li>
        <li className="rounded-full transition-colors hover:bg-zinc-100">
          <Link
            to="/admin/customize"
            className="flex h-full w-full items-center gap-x-2 py-3 pl-8 text-sm"
          >
            <img src={customizeIcon} alt="customize icon" />
            Customizar página
          </Link>
        </li>
      </ul>
    </nav>
  );
};

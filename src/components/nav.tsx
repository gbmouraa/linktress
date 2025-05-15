import { Link, useLocation } from "react-router-dom";
import homeIcon from "@/assets/menu-icons/home_menu_icon.svg";
import customizeIcon from "@/assets/menu-icons/customize_page_menu.svg";
import pencilIcon from "@/assets/menu-icons/edit_sdwc_menu.svg";

export const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="p-8 md:h-[calc(100vh-62px)] md:w-[300px] md:border-r-2">
      <ul className="flex items-center justify-evenly gap-4 md:flex-col md:items-start md:justify-start">
        <li
          className={`rounded-full transition-colors md:hover:bg-zinc-100 ${currentPath === "/admin" ? "md:bg-zinc-200" : ""}`}
        >
          <Link
            to="/admin"
            className="flex h-full flex-col items-center justify-center gap-x-2 text-xs md:min-w-[236px] md:flex-row md:justify-start md:py-3 md:pl-8 md:text-sm"
          >
            <div
              className={`rounded-full bg-zinc-100 p-4 md:rounded-none md:bg-transparent md:p-0 ${currentPath === "/admin" ? "bg-indigo-200" : ""}`}
            >
              <img src={homeIcon} alt="home icon" />
            </div>
            <span className="mt-6 -translate-y-[3px] md:mt-0 md:-translate-y-0">
              Home
            </span>
          </Link>
        </li>
        <li
          className={`rounded-full transition-colors md:hover:bg-zinc-100 ${currentPath === "/admin/edit-page" ? "md:bg-zinc-200" : ""}`}
        >
          <Link
            to="/admin/edit-page"
            className="flex w-full flex-col items-center justify-center gap-x-2 text-xs md:min-w-[236px] md:flex-row md:justify-start md:py-3 md:pl-8 md:text-sm"
          >
            <div
              className={`rounded-full bg-zinc-100 p-4 md:rounded-none md:bg-transparent md:p-0 ${currentPath === "/admin/edit-page" ? "bg-indigo-200" : ""}`}
            >
              <img src={pencilIcon} alt="pencil icon" />
            </div>
            <span className="mt-6 md:mt-0">Editar</span>
          </Link>
        </li>
        <li
          className={`rounded-full transition-colors md:hover:bg-zinc-100 ${currentPath === "/admin/customize-page" ? "md:bg-zinc-200" : ""}`}
        >
          <Link
            to="/admin/customize-page"
            className="flex w-full flex-col items-center justify-center gap-x-2 text-xs md:min-w-[236px] md:flex-row md:justify-start md:py-3 md:pl-8 md:text-sm"
          >
            <div
              className={`rounded-full bg-zinc-100 p-4 md:rounded-none md:bg-transparent md:p-0 ${currentPath === "/admin/customize-page" ? "bg-indigo-200" : ""}`}
            >
              <img src={customizeIcon} alt="customize icon" />
            </div>
            <span className="mt-6 md:mt-0">Customizar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

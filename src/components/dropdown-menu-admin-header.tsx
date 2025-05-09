import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { auth } from "../services/firebase-connection";
import { Link } from "react-router-dom";
import homeIcon from "@/assets/menu-icons/home_menu_icon.svg";
import customizeIcon from "@/assets/menu-icons/customize_page_menu.svg";
import pencilIcon from "@/assets/menu-icons/edit_sdwc_menu.svg";
import exitIcon from "@/assets/menu-icons/logout_menu.svg";

export function DropdownMenuAdminHeader() {
  const { username } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent p-0 shadow-none outline-none">
          {/* TODO: Adicionar foto do usuário */}
          <div className="flex items-center gap-x-2">
            <FaUserCircle size={36} className="text-zinc-200" />
            <MdOutlineKeyboardArrowDown color="#000" size={24} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] -translate-x-6 translate-y-5 p-4">
        <DropdownMenuLabel>
          <div className="flex flex-col items-center justify-center space-y-2">
            {/* TODO: adiconar foto e nome do usuário */}
            <FaUserCircle size={36} className="text-zinc-200" />
            <span>{username}</span>
            <div className="flex items-center justify-center gap-x-5">
              <Link to="" className="text-sm font-normal underline">
                linktress/gbmoura
              </Link>
              {/* button para copiar a url do perfil */}
              <button>
                <FaRegCopy />
              </button>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem>
            <Link to="/admin" className="flex items-center gap-x-2">
              <img src={homeIcon} alt="home icon" width={20} />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/admin/edit" className="flex items-center gap-x-2">
              <img src={pencilIcon} alt="pencil icon" width={20} />
              Editar linktress
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/admin/customize-page"
              className="flex items-center gap-x-2"
            >
              <img src={customizeIcon} alt="customize icon" width={20} />
              Customizar página
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="mt-2 flex gap-x-2" onClick={handleLogout}>
            <img src={exitIcon} alt="exit icon" />
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
import { copyToClipboard } from "../utils/copy-to-clipboard";
import { toast } from "sonner";

export function DropdownMenuAdminHeader() {
  const { user, changeUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("@linktress");
      changeUser(null);
      console.log("Logout successful");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (user?.username) {
      copyToClipboard(user.username);
      toast("Url copiada", {
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent p-0 shadow-none outline-none">
          <div className="flex items-center gap-x-2">
            {user?.profileImageURL ? (
              <img
                src={user.profileImageURL}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={36} className="text-zinc-200" />
            )}
            <MdOutlineKeyboardArrowDown color="#000" size={24} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px] -translate-x-6 translate-y-5 p-4">
        <DropdownMenuLabel>
          <div className="flex flex-col items-center justify-center space-y-2">
            {user?.profileImageURL ? (
              <img
                src={user.profileImageURL}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={36} className="text-zinc-200" />
            )}
            <span>{user?.name ? user.name : user!.username}</span>
            <div className="flex items-center justify-center gap-x-5">
              <Link
                to={`https://linktress-pied.vercel.app/linktress/${user!.username}`}
                className="text-sm font-normal underline"
              >
                https://linktress...
              </Link>
              <button onClick={() => handleCopyToClipboard()}>
                <FaRegCopy />
              </button>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-[2px]">
          <DropdownMenuItem>
            <Link
              to="/admin"
              className="flex w-full items-center gap-x-2 rounded-full py-2 pl-3 transition-colors hover:bg-zinc-200"
            >
              <img src={homeIcon} alt="home icon" width={20} />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/admin/edit-page"
              className="flex w-full items-center gap-x-2 rounded-full py-2 pl-3 transition-colors hover:bg-zinc-200"
            >
              <img src={pencilIcon} alt="pencil icon" width={20} />
              Editar linktress
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/admin/customize-page"
              className="flex w-full items-center gap-x-2 rounded-full py-2 pl-3 transition-colors hover:bg-zinc-200"
            >
              <img src={customizeIcon} alt="customize icon" width={20} />
              Customizar página
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="mt-1 flex w-full gap-x-2 rounded-full py-2 pl-3 hover:bg-zinc-200"
            onClick={handleLogout}
          >
            <img src={exitIcon} alt="exit icon" />
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

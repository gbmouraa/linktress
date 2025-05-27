import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { FaRegCopy } from "react-icons/fa";
import { copyToClipboard } from "../utils/copy-to-clipboard";
import { toast } from "sonner";

interface CopyProfileLinkButtonProps {
  username: string;
  textColor?: string;
}

export const CopyProfileLinkButton = ({
  username,
  textColor,
}: CopyProfileLinkButtonProps) => {
  const url = "https://linktress-pied.vercel.app/linktress/";

  const { user } = useContext(UserContext);

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
    <button
      className="flex w-full items-center justify-center gap-x-3 rounded-xl bg-zinc-100 py-4 text-xs font-bold transition-colors hover:bg-zinc-200"
      style={{ color: textColor || "inherit" }}
      onClick={() => handleCopyToClipboard()}
    >
      <span
        className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ display: "block" }}
      >
        {url + username}
      </span>
      <FaRegCopy />
    </button>
  );
};

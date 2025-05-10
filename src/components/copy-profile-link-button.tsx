import { FaRegCopy } from "react-icons/fa";

interface CopyProfileLinkButtonProps {
  profileURL: string;
  textColor?: string;
}

export const CopyProfileLinkButton = ({
  profileURL,
  textColor,
}: CopyProfileLinkButtonProps) => {
  return (
    <button
      className="flex w-full items-center justify-center gap-x-3 rounded-xl bg-zinc-100 py-4 text-xs font-bold transition-colors hover:bg-zinc-200"
      style={{ color: textColor || "inherit" }}
    >
      {profileURL}
      <FaRegCopy />
    </button>
  );
};

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CopyProfileLinkButton } from "../components/copy-profile-link-button";
import { FaUserCircle } from "react-icons/fa";

interface AlertDialogProfilePageProps {
  username?: string;
  profileURL?: string;
  profileImgURL?: string | null;
}

export const AlertDialogProfilePage = ({
  username,
  profileURL,
  profileImgURL,
}: AlertDialogProfilePageProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-10 w-10 rounded-full p-0">
          <Ellipsis color="#fff" size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-32px)] rounded-xl py-4">
        <AlertDialogHeader className="flex-row items-center justify-center">
          <AlertDialogTitle className="flex-1 text-center text-xs">
            Compartilhe este perfil Linktress!
          </AlertDialogTitle>
          <AlertDialogCancel className="h-6 w-6 -translate-y-1 space-y-0 rounded-full p-0">
            <IoMdClose />
          </AlertDialogCancel>
          <AlertDialogDescription className="sr-only">
            Compartilhar perfil
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-y-3 rounded-xl border border-zinc-200 p-4 shadow-sm">
          {profileImgURL ? (
            <img
              src={profileImgURL}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={64} />
          )}
          <span className="text-xs font-bold">{username}</span>
          {/* TODO: adiocionar funcionalidade para copiar o link */}
          <CopyProfileLinkButton profileURL={profileURL!} />
        </div>
        <div className="rounded-xl bg-zinc-100 p-4 text-center">
          <span className="text-center text-xs font-bold">
            Crie seu perfil no Linktress
          </span>
          <div className="mt-3 flex gap-x-3">
            <Button
              asChild
              className="w-full rounded-full text-xs font-bold hover:bg-black/80"
            >
              <Link to="/register">Criar Linktres</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="w-full rounded-full border-black text-xs font-bold hover:bg-zinc-50"
            >
              <Link to="/admin/edit-page">Editar minha página</Link>
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

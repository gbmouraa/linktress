import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { AdminHeader } from "../components/admin-header";
import { Nav } from "../components/nav";
import { FaUserCircle } from "react-icons/fa";
import { CopyProfileLinkButton } from "../components/copy-profile-link-button";

export const Admin = () => {
  const { username, profileImageURL } = useContext(UserContext);

  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col md:flex-row">
        <Nav />
        <main className="mx-auto flex w-full max-w-[544px] flex-col gap-y-6 px-4 pt-8 md:max-w-[780px]">
          <h1 className="text-lg font-medium md:text-2xl">Sua Página</h1>
          <div className="flex w-full flex-col items-center gap-y-4 rounded-xl bg-gradient-to-r from-redGradient to-purpleGradient px-4 py-10">
            <div className="mb-2">
              {profileImageURL !== null ? (
                <img
                  src={profileImageURL}
                  alt="Imagem de perfil"
                  className="h-10 w-10 rounded-full object-cover md:h-[70px] md:w-[70px]"
                />
              ) : (
                <FaUserCircle className="text-[42px] text-zinc-200 md:text-[70px]" />
              )}
            </div>
            <span className="text-xs font-bold text-zinc-300 md:text-sm">
              Este é o link do seu perfil
            </span>
            {/* TODO: adionar link após o deploy */}
            <CopyProfileLinkButton
              profileURL={`https://linktress/${username}`}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

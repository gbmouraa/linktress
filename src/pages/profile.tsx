import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserProfile, UserDataType } from "../utils/firebase";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { AlertDialogProfilePage } from "../components/alert-dialog-profile-page";
import { FaUserCircle } from "react-icons/fa";

export const Profile = () => {
  const [userData, setUserData] = useState<UserDataType | null>();

  const { profile } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await getUserProfile(profile!);
      if (data) {
        setUserData(data);
      } else {
        navigate("/");
      }
    };

    loadData();
  }, [profile, navigate]);

  return (
    <div
      className="h-screen w-full pt-5"
      style={{ backgroundColor: userData?.pageBg || "#ffffff" }}
    >
      <section
        aria-label="Página do usuário"
        className="mx-auto w-full max-w-[580px] px-4"
      >
        <header>
          <div className="flex items-center justify-between">
            <Link to="/">
              <PiLinktreeLogoLight color="#fff" size={40} />
            </Link>
            <AlertDialogProfilePage
              username={userData?.username}
              profileURL="https://linktress/profile/gabriel"
            />
          </div>
        </header>
        <main className="flex flex-col items-center py-10">
          <div className="text-center">
            {userData?.profileImageURL !== "" ? (
              <img
                src={userData?.profileImageURL}
                alt="profile image"
                className="h-24 w-24 rounded-full"
              />
            ) : (
              <FaUserCircle size={96} className="text-zinc-100" />
            )}
            <span className="mt-3 inline-block text-2xl font-bold text-white">
              {userData?.name !== "" ? userData?.name : userData.username}
            </span>
          </div>
          {/* Links */}
          <div>{/* userData?.links.length > 0 && */}</div>
        </main>
      </section>
    </div>
  );
};

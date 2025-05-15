import { useEffect, useState } from "react";
import { LoadingAnimation } from "../components/loading-animation";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../utils/firebase";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { AlertDialogProfilePage } from "../components/alert-dialog-profile-page";
import { FaUserCircle } from "react-icons/fa";
import { UserProfileType } from "../types";

export const Profile = () => {
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const data = await getUserProfile(profile!);
      if (data) {
        setProfileData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/");
      }
    };
    getProfile();
  }, [profile, navigate]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div
      className="h-screen w-full pt-5"
      style={{ backgroundColor: profileData?.pageBg || "#ffffff" }}
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
              username={profileData?.username}
              profileImgURL={profileData?.profileImageURL}
              profileURL={`"https://linktress/${profileData?.username}`}
            />
          </div>
        </header>
        <main className="flex flex-col items-center py-10">
          <div className="text-center">
            {profileData?.profileImageURL ? (
              <img
                src={profileData?.profileImageURL}
                alt="profile image"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={96} className="text-zinc-100" />
            )}
            <span className="mt-3 inline-block text-2xl font-bold text-white">
              {profileData?.name !== ""
                ? profileData?.name
                : profileData.username}
            </span>
          </div>
          {/* Links */}
          <div>{/* userData?.links.length > 0 && */}</div>
        </main>
      </section>
    </div>
  );
};

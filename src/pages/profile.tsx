import { useEffect, useState } from "react";
import { LoadingAnimation } from "../components/loading-animation";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../utils/firebase";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { AlertDialogProfilePage } from "../components/alert-dialog-profile-page";
import { FaUserCircle } from "react-icons/fa";
import { UserProfileType } from "../types";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase-connection";

type LinkType = {
  id: string;
  name: string;
  url: string;
};

export const Profile = () => {
  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
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

  useEffect(() => {
    const getLinks = async () => {
      const userRef = doc(db, "users", profile!);
      const linksRef = collection(userRef, "links");
      const snapshot = await getDocs(linksRef);

      if (snapshot.empty) return;

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
      }));

      setLinks(list);
    };

    getLinks();
  }, [profile]);

  const bgIsAnImage = profileData?.pageBg.startsWith("#") ? false : true;

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div
      className={`h-screen w-full md:py-5 ${bgIsAnImage && "default-gradient-profile-page"}`}
      style={{ backgroundColor: bgIsAnImage ? "#d8d8d8" : profileData?.pageBg }}
    >
      <section
        aria-label="Página do usuário"
        className={`mx-auto h-full w-full max-w-[580px] px-4 py-5 md:rounded-xl ${bgIsAnImage ? "bg-cover bg-center bg-no-repeat" : ""}`}
        style={
          bgIsAnImage
            ? { backgroundImage: `url('${profileData?.pageBg}')` }
            : { backgroundColor: profileData?.pageBg }
        }
      >
        <header>
          <div className="flex items-center justify-between">
            <Link to="/">
              <PiLinktreeLogoLight
                color={profileData?.pageBg === "#FFF" ? "#000" : "#FFF"}
                size={40}
              />
            </Link>
            <AlertDialogProfilePage
              name={profileData?.name || profileData!.username}
              profileImgURL={profileData?.profileImageURL}
              username={profileData?.username}
            />
          </div>
        </header>
        <main className="flex flex-col items-center py-10">
          <div className="flex flex-col items-center text-center">
            {profileData?.profileImageURL ? (
              <img
                src={profileData?.profileImageURL}
                alt="profile image"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={96} className="text-zinc-100" />
            )}
            <span
              className={`mt-3 inline-block text-2xl font-extrabold ${profileData?.pageBg !== "#FFF" ? "text-white" : "text-black"}`}
            >
              {profileData?.name !== ""
                ? profileData?.name
                : profileData.username}
            </span>
            <p
              className={`mt-3 text-sm font-medium ${profileData?.pageBg !== "#FFF" ? "text-white" : "text-black"}`}
            >
              {profileData?.bio ? profileData.bio : ""}
            </p>
          </div>
          <ul className="mt-8 w-full space-y-3">
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  target="_blank"
                  to={item.url}
                  className="block w-full rounded-full py-3 text-center font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${profileData?.linkBg}`,
                    color: `${profileData?.linkColor}`,
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </section>
    </div>
  );
};

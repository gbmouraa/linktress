import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import customizePageIcon from "../assets/edit-page-icons/customize-page-icon.png";
import { EditPageHeader } from "../components/edit-page-header";
import { UserProfileType } from "../types";
import { getUserProfile } from "../utils/firebase";
import { LoadingAnimation } from "../components/loading-animation";

export const CustomizePage = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileType>(
    {} as UserProfileType,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const data = await getUserProfile(user!.username!);
      if (data) {
        setProfileData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/admin/costumize-page");
      }
    };
    getProfile();
  }, [navigate, user]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <main className="mx-auto w-full max-w-[624px] px-5 pt-6">
        <Link
          to="/admin/edit-page"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200"
        >
          <IoMdClose color="#000" size={22} />
        </Link>
        <div className="mt-8 space-y-2">
          <img src={customizePageIcon} alt="Icon" />
          <h1 className="text-2xl font-medium">Customizar página</h1>
          <p className="text-sm text-zinc-500">
            Personalize a sua página para corresponder à sua marca e salve para
            a aplicar.
          </p>
        </div>
        <div className="mt-6">
          <section id="costumize-header">
            <EditPageHeader data={profileData} />
          </section>
        </div>
      </main>
    </div>
  );
};

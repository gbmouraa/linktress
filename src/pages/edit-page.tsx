import { AdminHeader } from "../components/admin-header";
import { Nav } from "../components/nav";
import { Palette, PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { IoEyeOutline } from "react-icons/io5";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase-connection";

type LinkType = {
  id: string;
  name: string;
  url: string;
};

export const EditPage = () => {
  const [links, setLinks] = useState<LinkType[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getLinks = async () => {
      if (user?.username) {
        const userRef = doc(db, "users", user.username);
        const linksRef = collection(userRef, "links");
        const snapshot = await getDocs(linksRef);

        if (snapshot.empty) return;

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
        }));

        setLinks(list);
      }
    };

    getLinks();
  }, [user?.username]);

  return (
    <div>
      <AdminHeader />
      <div className="flex flex-col md:flex-row">
        <Nav />
        <main className="relative min-h-[calc(100vh-212px)] w-full bg-black md:min-h-[calc(100vh-62px)]">
          <div className="mx-auto flex w-full max-w-[544px] flex-col gap-y-6 px-4 pt-8 md:max-w-[580px]">
            <div className="mb-6 flex justify-between">
              <Link
                to="/admin/customize-page/#costumize-bg"
                className="flex gap-x-2 rounded-full bg-gradient-to-b from-indigo-600 to-purple-500 px-5 py-3"
              >
                <Palette color="#fff" size={16} />
                <span className="text-xs text-white">Cores</span>
              </Link>
              <Link
                to="/admin/customize-page/#costumize-header"
                className="flex gap-x-2 rounded-full border border-white px-5 py-3"
              >
                <PencilIcon color="#fff" size={16} />
                <span className="text-xs text-white">Editar cabeçalho</span>
              </Link>
            </div>
            {links.length > 0 && (
              <ul className="mb-10 space-y-3">
                {links.map((item) => (
                  <li
                    key={item.id}
                    className="w-full rounded-full bg-white py-3 text-center font-medium"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/admin/add-link-button"
              className="block w-full rounded-full bg-indigo-500 py-3 text-center font-medium text-white transition-colors hover:bg-white/80"
            >
              Adicionar +
            </Link>
          </div>
          <Link
            to={`/linktress/${user!.username}`}
            className="absolute bottom-4 right-4 flex w-fit items-center gap-x-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            <IoEyeOutline size={18} />
            <span>Ver minha página</span>
          </Link>
        </main>
      </div>
    </div>
  );
};

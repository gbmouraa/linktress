import { AdminHeader } from "../components/admin-header";
import { Nav } from "../components/nav";

export const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <Nav />
      </div>
    </div>
  );
};

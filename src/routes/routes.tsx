import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Private } from "./private";
import { Admin } from "../pages/admin";
import { ProfileRoute } from "./profile-route";
import { Profile } from "../pages/profile";
import { EditPage } from "../pages/edit-page";
import { CustomizePage } from "../pages/customize-page";
import { NotFound } from "../pages/not-found";

export const AppRoutes = () => {
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <Private>
              <Admin />
            </Private>
          }
        />
        <Route
          path="/linktress/:profile"
          element={
            <ProfileRoute>
              <Profile />
            </ProfileRoute>
          }
        />
        <Route
          path="/admin/edit-page"
          element={
            <Private>
              <EditPage />
            </Private>
          }
        />
        <Route
          path="/admin/customize-page"
          element={
            <Private>
              <CustomizePage />
            </Private>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

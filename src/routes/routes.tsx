import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Private } from "./private";
import { Admin } from "../pages/admin";
import { ProfileRoute } from "./profile-route";
import { Profile } from "../pages/profile";

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
          path="/profile/:profile"
          element={
            <ProfileRoute>
              <Profile />
            </ProfileRoute>
          }
        />
      </Routes>
    </div>
  );
};

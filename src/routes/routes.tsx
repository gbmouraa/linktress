import { Route, Routes } from "react-router-dom";
import { Home } from "../components/home";
import { Login } from "../components/login";

export const AppRoutes = () => {
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

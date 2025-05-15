import { AppRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import { UserContextProvider } from "./contexts/user-context-provider";
function App() {
  return (
    <>
      <UserContextProvider>
        <AppRoutes />
        <ToastContainer />
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;

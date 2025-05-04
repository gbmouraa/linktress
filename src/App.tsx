import { AppRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./contexts/user-context-provider";
function App() {
  return (
    <>
      <UserContextProvider>
        <AppRoutes />
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

export default App;

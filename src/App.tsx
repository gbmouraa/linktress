import { AppRoutes } from "./routes/routes";
import { Toaster } from "sonner";
import { UserContextProvider } from "./contexts/user-context-provider";
function App() {
  return (
    <>
      <UserContextProvider>
        <AppRoutes />
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;

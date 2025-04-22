import { Header } from "./header";
import { Introduction } from "./introduction";

export const Home = () => {
  return (
    <div className="w-full" aria-label="Cabeçalho">
      <Header />
      <Introduction />
    </div>
  );
};

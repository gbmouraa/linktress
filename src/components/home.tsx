import { Description } from "./description";
import { Header } from "./header";
import { Introduction } from "./introduction";

export const Home = () => {
  return (
    <main>
      <div className="w-full" aria-label="Cabeçalho">
        <Header />
        <Introduction />
        <Description />
      </div>
    </main>
  );
};

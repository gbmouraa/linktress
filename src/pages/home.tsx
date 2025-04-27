import { Description } from "../components/description";
import { Header } from "../components/header";
import { Instructions } from "../components/instructions";
import { Introduction } from "../components/introduction";

export const Home = () => {
  return (
    <main>
      <div className="w-full" aria-label="Cabeçalho">
        <Header />
        <Introduction />
        <Description />
        <Instructions />
      </div>
    </main>
  );
};

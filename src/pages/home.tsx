import { Description } from "../components/description";
import { Header } from "../components/header";
import { Instructions } from "../components/instructions";
import { Introduction } from "../components/introduction";
import { Footer } from "../components/footer";

export const Home = () => {
  return (
    <main className="w-full">
      <Header />
      <Introduction />
      <Description />
      <Instructions />
      <Footer />
    </main>
  );
};

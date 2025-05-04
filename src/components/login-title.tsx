import { PiLinktreeLogoLight } from "react-icons/pi";

interface LoginTitleProps {
  title: string;
  subTitle: string;
}

export const LoginTitle = ({ title, subTitle }: LoginTitleProps) => {
  return (
    <>
      <div className="logo mx-auto flex max-w-[800px] items-center">
        <PiLinktreeLogoLight
          color="#000"
          className="text-[60px] md:text-[48px]"
        />
        <span className="logo select-none text-4xl font-light md:text-3xl">
          Linktress
        </span>
      </div>
      <div className="mt-8 md:text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-zinc-600">{subTitle}</p>
      </div>
    </>
  );
};

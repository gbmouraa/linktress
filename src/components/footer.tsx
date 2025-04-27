import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 py-4 text-white">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Desenvolvido por Gabriel Moura
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/gabriel-moura-b63382161/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/gbmouraa"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

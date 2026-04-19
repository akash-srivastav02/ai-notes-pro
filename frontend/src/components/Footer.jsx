const Footer = () => {
  return (
    <footer className="w-full mt-10 border-t border-white/10 pt-6 pb-4 text-center text-gray-400">

      <p className="mb-3">
        Built with ❤️ by <span className="text-white font-semibold">Akash Srivastav</span>
      </p>

      <div className="flex justify-center gap-6 text-sm">

        <a
          href="https://github.com/akash-srivastav02"
          target="_blank"
          className="hover:text-white transition"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/akash-srivastav02/"
          target="_blank"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>

        <a
          href="https://akash-srivastav.netlify.app/"
          target="_blank"
          className="hover:text-white transition"
        >
          Portfolio
        </a>

      </div>

      <p className="text-xs mt-4 text-gray-500">
        © {new Date().getFullYear()} All rights reserved
      </p>

    </footer>
  );
};

export default Footer;
import type { JSX } from "react";


function Footer(): JSX.Element {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300 text-gray-600 text-sm mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-6">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-sky-600">
            AI Crypto Advisor
          </span>
          . All rights reserved.
        </p>

        <div className="flex space-x-6 mt-3 md:mt-0">
          <a
            href="https://github.com/orikeni?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-600 transition"
          >
            GitHub
          </a>
          <a href="#" className="hover:text-sky-600 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-sky-600 transition">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 border-t border-stone-200 bg-white px-6 py-3">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <small className="font-sans antialiased text-xs text-stone-400">
          © {year}{" "}
          <a
            href="#"
            className="hover:text-stone-700 transition-colors duration-150"
          >
            Admin Dashboard
          </a>
          . All Rights Reserved.
        </small>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-sans antialiased text-xs text-stone-400 hover:text-stone-700 transition-colors duration-150"
          >
            Privacy Policy
          </a>
          <span className="text-stone-200">·</span>
          <a
            href="#"
            className="font-sans antialiased text-xs text-stone-400 hover:text-stone-700 transition-colors duration-150"
          >
            Terms of Service
          </a>
          <span className="text-stone-200">·</span>
          <a
            href="#"
            className="font-sans antialiased text-xs text-stone-400 hover:text-stone-700 transition-colors duration-150"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

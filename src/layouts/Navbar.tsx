import { useState, useEffect, useRef } from "react";

const pagesLinks = [
  { label: "Landing Page" },
  { label: "About Us" },
  { label: "Contact" },
  { label: "Author" },
  { label: "Sign In" },
];

const navItemClass =
  "flex items-center cursor-pointer py-1.5 px-2.5 rounded-md select-none font-sans transition-colors duration-150 text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200";

// Reusable icon: Pages / Documents
const PagesIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M7 18H10.5H14"></path>
    <path d="M7 14H7.5H8"></path>
    <path d="M7 10H8.5H10"></path>
    <path d="M7 2L16.5 2L21 6.5V19"></path>
    <path d="M3 20.5V6.5C3 5.67157 3.67157 5 4.5 5H14.2515C14.4106 5 14.5632 5.06321 14.6757 5.17574L17.8243 8.32426C17.9368 8.43679 18 8.5894 18 8.74853V20.5C18 21.3284 17.3284 22 16.5 22H4.5C3.67157 22 3 21.3284 3 20.5Z"></path>
    <path d="M14 5V8.4C14 8.73137 14.2686 9 14.6 9H18"></path>
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="rounded-lg border shadow-lg bg-white border-stone-200 shadow-stone-950/5 mx-auto w-full max-w-screen-xl">
      <div className="flex items-center p-2">
        <a
          href="#"
          className="font-sans antialiased text-sm text-current ml-2 mr-2 block py-1 font-semibold whitespace-nowrap"
        >
          Material Tailwind
        </a>
        <hr className="mx-1 hidden h-5 w-px border-l border-t-0 border-stone-300 lg:block" />

        {/* Desktop nav links */}
        <div className="hidden lg:flex lg:items-center lg:gap-1 ml-1">
          {/* Pages dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className={navItemClass}
            >
              <span className="grid place-items-center shrink-0 mr-1.5">
                <PagesIcon />
              </span>
              <small className="font-sans antialiased text-sm text-current">
                Pages
              </small>
              <svg
                width="1em"
                height="1em"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-3.5 w-3.5 ml-1.5 transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9L12 15L18 9" />
              </svg>
            </button>
            {pagesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-md p-1 z-50 min-w-[160px]">
                {pagesLinks.map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-md transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Account */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-1.5">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"></path>
                <path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"></path>
                <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Account
            </small>
          </a>

          {/* Blocks */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-1.5">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z"></path>
                <path d="M3.52844 7.29357L11.7086 11.8381C11.8898 11.9388 12.1102 11.9388 12.2914 11.8381L20.5 7.27777"></path>
                <path d="M12 21L12 12"></path>
                <path
                  d="M11.6914 11.8285L3.89139 7.49521C3.49147 7.27304 3 7.56222 3 8.01971V16.647C3 16.8649 3.11813 17.0656 3.30861 17.1715L11.1086 21.5048C11.5085 21.727 12 21.4378 12 20.9803V12.353C12 12.1351 11.8819 11.9344 11.6914 11.8285Z"
                  fill="currentColor"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Blocks
            </small>
          </a>

          {/* Docs */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-1.5">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M7 6L17 6"></path>
                <path d="M7 9L17 9"></path>
                <path d="M9 17H15"></path>
                <path d="M3 12H2.6C2.26863 12 2 12.2686 2 12.6V21.4C2 21.7314 2.26863 22 2.6 22H21.4C21.7314 22 22 21.7314 22 21.4V12.6C22 12.2686 21.7314 12 21.4 12H21M3 12V2.6C3 2.26863 3.26863 2 3.6 2H20.4C20.7314 2 21 2.26863 21 2.6V12M3 12H21"></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Docs
            </small>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto mr-2 grid place-items-center min-w-[34px] min-h-[34px] rounded-md text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-150 lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            width="1em"
            height="1em"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M3 5H21"></path>
            <path d="M3 12H21"></path>
            <path d="M3 19H21"></path>
          </svg>
        </button>

        {/* Profile avatar */}
        <img
          src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-4.jpg"
          alt="profile-picture"
          className="inline-block object-cover object-center w-8 h-8 rounded border border-stone-300 p-0.5 lg:ml-auto cursor-pointer"
        />
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-2 pb-3 pt-1">
          {/* Pages collapsible */}
          <button
            onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
            className={`${navItemClass} justify-between w-full`}
          >
            <span className="flex items-center">
              <span className="grid place-items-center shrink-0 mr-2">
                <PagesIcon />
              </span>
              <small className="font-sans antialiased text-sm text-current">
                Pages
              </small>
            </span>
            <svg
              width="1em"
              height="1em"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-3.5 w-3.5 transition-transform duration-200 ${mobilePagesOpen ? "rotate-180" : ""}`}
            >
              <path d="M6 9L12 15L18 9" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              mobilePagesOpen ? "max-h-60" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col gap-0.5 pl-2">
              {pagesLinks.map((link) => (
                <li
                  key={link.label}
                  className="flex items-center cursor-pointer py-1.5 px-2.5 pl-9 rounded-md select-none font-sans transition-colors duration-150 text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200"
                >
                  <small className="font-sans antialiased text-sm text-current">
                    {link.label}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-2">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"></path>
                <path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"></path>
                <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Account
            </small>
          </a>

          {/* Blocks */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-2">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z"></path>
                <path d="M3.52844 7.29357L11.7086 11.8381C11.8898 11.9388 12.1102 11.9388 12.2914 11.8381L20.5 7.27777"></path>
                <path d="M12 21L12 12"></path>
                <path
                  d="M11.6914 11.8285L3.89139 7.49521C3.49147 7.27304 3 7.56222 3 8.01971V16.647C3 16.8649 3.11813 17.0656 3.30861 17.1715L11.1086 21.5048C11.5085 21.727 12 21.4378 12 20.9803V12.353C12 12.1351 11.8819 11.9344 11.6914 11.8285Z"
                  fill="currentColor"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Blocks
            </small>
          </a>

          {/* Docs */}
          <a href="#" className={navItemClass}>
            <span className="grid place-items-center shrink-0 mr-2">
              <svg
                width="1em"
                height="1em"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M7 6L17 6"></path>
                <path d="M7 9L17 9"></path>
                <path d="M9 17H15"></path>
                <path d="M3 12H2.6C2.26863 12 2 12.2686 2 12.6V21.4C2 21.7314 2.26863 22 2.6 22H21.4C21.7314 22 22 21.7314 22 21.4V12.6C22 12.2686 21.7314 12 21.4 12H21M3 12V2.6C3 2.26863 3.26863 2 3.6 2H20.4C20.7314 2 21 2.26863 21 2.6V12M3 12H21"></path>
              </svg>
            </span>
            <small className="font-sans antialiased text-sm text-current">
              Docs
            </small>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

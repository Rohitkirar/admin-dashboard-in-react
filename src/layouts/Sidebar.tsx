import { useState } from "react";
import { NavLink } from "react-router-dom";
import PrivateRouteNames from "../constants/PrivateRouteNames";
import PublicRouteNames from "../constants/PublicRouteNames";
import { useAuth } from "../hooks/useAuth";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12H15V22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LoginIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H15M10 17L14 12L10 7M14 12H3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RegisterIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 20C3 17.2386 5.23858 15 8 15H16C18.7614 15 21 17.2386 21 20" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 19H22M19 16V22" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M12 12H19M19 12L16 15M19 12L16 9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="h-[18px] w-[18px]">
    <path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg width="1em" height="1em" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9L12 15L18 9" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 18L9 12L15 6" />
  </svg>
);

// ─── Shared class strings ─────────────────────────────────────────────────────

const baseItemClass =
  "flex items-center w-full py-1.5 px-2.5 rounded-md select-none font-sans transition-colors duration-150 cursor-pointer text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200";

const activeNavClass = "bg-stone-100 text-stone-900 font-medium";
const inactiveNavClass = "text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  badge?: string | number;
}

const NavItem = ({ to, icon, label, collapsed, badge }: NavItemProps) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center w-full py-1.5 px-2.5 rounded-md select-none font-sans transition-colors duration-150 cursor-pointer ${
          isActive ? activeNavClass : inactiveNavClass
        }`
      }
    >
      <span className="grid place-items-center shrink-0 me-2.5">{icon}</span>
      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge !== undefined && (
            <span className="ml-auto grid place-items-center shrink-0 ps-2.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-stone-800/10 text-stone-800">
                {badge}
              </span>
            </span>
          )}
        </>
      )}
    </NavLink>
  </li>
);

interface SidebarSectionProps {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarSection = ({ label, icon, collapsed, isOpen, onToggle, children }: SidebarSectionProps) => (
  <li>
    <button
      onClick={onToggle}
      className={`${baseItemClass} justify-between`}
    >
      <span className="flex items-center gap-3">
        <span className="grid place-items-center shrink-0">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </span>
      {!collapsed && (
        <ChevronDownIcon
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      )}
    </button>
    {!collapsed && (
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-0.5 mt-0.5">{children}</ul>
      </div>
    )}
  </li>
);

// ─── Nav data ─────────────────────────────────────────────────────────────────

const mainNavItems = [
  { to: PrivateRouteNames.HOME, icon: <HomeIcon />, label: "Dashboard" },
  { to: PrivateRouteNames.USERS, icon: <UsersIcon />, label: "Users" },
];

const authNavItems = [
  { to: PublicRouteNames.LOGIN, icon: <LoginIcon />, label: "Login" },
  { to: PublicRouteNames.SIGN_UP, icon: <RegisterIcon />, label: "Sign Up" },
];

const moreSubItems = ["Inbox", "Trash", "Settings"];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { logoutUser } = useAuth();

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r border-stone-200 shadow-sm shadow-stone-950/5 transition-all duration-300 overflow-hidden shrink-0 ${
        collapsed ? "w-[60px]" : "w-[280px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 shrink-0 border-b border-stone-100">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/refs/heads/master/david-ui/logo-davidui.svg"
              alt="brand"
              className="inline-block object-cover object-center w-6 h-6 rounded-sm shrink-0"
            />
            <p className="font-sans antialiased text-base font-semibold whitespace-nowrap text-stone-900">
              Admin Dashboard
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center justify-center w-7 h-7 rounded-md text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors shrink-0 ${
            collapsed ? "mx-auto" : "ml-auto"
          }`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeftIcon
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-0.5">
          {/* Main nav */}
          {mainNavItems.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}

          <hr className="-mx-3 my-3 border-stone-200" />

          {/* Auth nav */}
          {authNavItems.map((item) => (
            <NavItem key={item.to} {...item} collapsed={collapsed} />
          ))}

          <hr className="-mx-3 my-3 border-stone-200" />

          {/* More (collapsible) */}
          <SidebarSection
            label="More"
            icon={<MoreIcon />}
            collapsed={collapsed}
            isOpen={moreOpen}
            onToggle={() => setMoreOpen(!moreOpen)}
          >
            {moreSubItems.map((item) => (
              <li
                key={item}
                className="pl-10 flex items-center cursor-pointer py-1.5 px-2.5 rounded-md select-none font-sans transition-colors duration-150 text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200"
              >
                {item}
              </li>
            ))}
          </SidebarSection>

          <hr className="-mx-3 my-3 border-stone-200" />

          {/* Logout */}
          <li>
            <button
              onClick={() => logoutUser()}
              className="flex items-center w-full py-1.5 px-2.5 rounded-md select-none font-sans transition-colors duration-150 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 active:bg-red-100"
            >
              <span className="grid place-items-center shrink-0 me-2.5">
                <LogoutIcon />
              </span>
              {!collapsed && "Logout"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

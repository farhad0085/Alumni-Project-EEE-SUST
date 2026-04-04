"use client";

import { DASHBOARD_PAGE, LOGIN_PAGE, LOGOUT_PAGE } from "@/lib/urls";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const closeNav = () => {
    setNavOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeNav();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    `block px-4 py-2 text-[0.95rem] font-medium transition-colors no-underline max-md:text-base max-md:py-3 max-md:text-center ${
      isActive(href) ? "text-[#0fb2ff]" : "text-gray-700 hover:text-[#0fb2ff]"
    }`;

  return (
    <header
      ref={headerRef}
      className="bg-white text-gray-800 sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-275 mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline text-gray-800"
          onClick={closeNav}
        >
          <Image
            src="https://www.sust.edu/public/img/sust_logo_big.png"
            alt="SUST Logo"
            width={38}
            height={38}
            className="w-9.5 h-9.5 rounded-full"
          />
          <div className="leading-tight">
            <h1 className="text-[1.05rem] font-bold m-0">Dept. of EEE</h1>
            <h2 className="text-[0.65rem] font-normal opacity-80 m-0">
              Shahjalal University of Science and Technology
            </h2>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className={`max-md:fixed max-md:top-16 max-md:left-0 max-md:w-full max-md:bg-white max-md:shadow-md max-md:transition-all max-md:duration-300 ${
            navOpen
              ? "max-md:max-h-125 max-md:opacity-100"
              : "max-md:max-h-0 max-md:opacity-0 max-md:overflow-hidden"
          }`}
        >
          <ul className="flex items-center gap-0 list-none m-0 p-0 max-md:flex-col max-md:items-center max-md:py-4 max-md:gap-1">
            <li>
              <Link href="/" onClick={closeNav} className={navLinkClass("/")}>
                Home
              </Link>
            </li>

            {/* Academics dropdown */}
            <li className="relative">
              <button
                className="flex items-center justify-center gap-1 px-4 py-2 text-[0.95rem] font-medium text-gray-700 hover:text-[#0fb2ff] bg-transparent border-none cursor-pointer transition-colors max-md:text-base max-md:py-3 max-md:w-full"
                onClick={() => toggleDropdown("academics")}
                aria-expanded={activeDropdown === "academics"}
              >
                Academics
                <span
                  className={`text-[0.6em] transition-transform ${
                    activeDropdown === "academics" ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <ul
                className={`absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg min-w-45 py-1 list-none m-0 z-50 transition-all duration-200 ${
                  activeDropdown === "academics"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                } max-md:static max-md:shadow-none max-md:bg-gray-50 max-md:text-gray-700 max-md:rounded-none max-md:w-full ${
                  activeDropdown === "academics"
                    ? "max-md:opacity-100 max-md:visible"
                    : "max-md:hidden"
                }`}
              >
                <li>
                  <Link
                    href="/study-materials"
                    onClick={closeNav}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 no-underline text-inherit max-md:hover:bg-transparent max-md:text-gray-600 max-md:text-base max-md:text-center max-md:py-3"
                  >
                    Study Materials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/labs-projects"
                    onClick={closeNav}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 no-underline text-inherit max-md:hover:bg-transparent max-md:text-gray-600 max-md:text-base max-md:text-center max-md:py-3"
                  >
                    Labs
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href="/notice-board"
                onClick={closeNav}
                className={navLinkClass("/notice-board")}
              >
                Notices
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                onClick={closeNav}
                className={navLinkClass("/events")}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/faculty-staff"
                onClick={closeNav}
                className={navLinkClass("/faculty-staff")}
              >
                Faculty
              </Link>
            </li>
            <li>
              <Link
                href="/alumni"
                onClick={closeNav}
                className={navLinkClass("/alumni")}
              >
                Alumni
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    href={DASHBOARD_PAGE}
                    onClick={closeNav}
                    className={navLinkClass(DASHBOARD_PAGE)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={LOGOUT_PAGE}
                    onClick={closeNav}
                    className={navLinkClass(LOGOUT_PAGE)}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href={LOGIN_PAGE}
                  onClick={closeNav}
                  className={navLinkClass(LOGIN_PAGE)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.25 bg-transparent border-none cursor-pointer"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
              navOpen ? "rotate-45 translate-y-1.75" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
              navOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
              navOpen ? "-rotate-45 -translate-y-1.75" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;

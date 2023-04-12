import React, { useEffect, useRef, useState } from "react";
import { Children, HeaderData, NavLink } from "./Header.types";
import Image from "next/image";
import DesktopMoreMenu from "./DesktopMoreMenu";
import styles from "./Header.module.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Link from "next/link";

export interface HeaderProps {
  headerData: HeaderData;
  searchResults: React.ReactNode;
  searchQuery?: string;
  setSearchQuery?: (searchQuery: string) => void;
}

const Header = ({
  headerData,
  searchResults,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  const [slideUp, setSlideUp] = useState(false);
  const [slideUpText, setSlideUpText] = useState(false);
  const [dropdown, setDropdown] = useState<Children>();
  const [navIsMouseOver, setNavIsMouseOver] = useState(false);
  const [dropdownIsMouseOver, setDropdownIsMouseOver] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  let slideUpTimeout: NodeJS.Timeout;

  const handleMouseEnter = (navLink: NavLink) => {
    if (dropdown && !slideUp) {
      setSlideUpText(true);
      setTimeout(() => setSlideUpText(false), 500);
    }
    setDropdown(navLink.children);
    clearTimeout(slideUpTimeout);
  };

  const closeDropdown = () => {
    setSlideUp(true);

    setTimeout(() => {
      setSlideUp(false);
      setDropdown(undefined);
    }, 450);
  };

  useEffect(() => {
    if (navIsMouseOver || dropdownIsMouseOver) return;

    closeDropdown();
  }, [navIsMouseOver, dropdownIsMouseOver]);

  useEffect(() => {
    if (!searchFocused) return;

    closeDropdown();
  }, [searchFocused]);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const [translateYValue, setTranslateYValue] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      const headerPosition = headerRef.current.getBoundingClientRect().top;
      setTranslateYValue(headerPosition);
    }
  }, []);

  const slideUpSearchKeyframes = `
  @keyframes slide-up-search {
    0% {
      transform: translateY(${translateYValue}px);
    }
    50% {
      transform: translateY(${translateYValue}px);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

  return (
    <>
      <style>{slideUpSearchKeyframes}</style>
      <header
        ref={headerRef}
        className={`bg-white shadow-md shadow-gray-200 z-30 ${
          styles.headerNavContainerSlideUp
        } ${searchFocused ? styles.headerNavContainerSlideUpFocused : ``}`}
        style={{
          transform: `translateY(0px)`,
          animationName: searchFocused ? `slide-up-search` : "",
        }}
      >
        <nav
          className={`w-full flex items-center justify-between px-4 md:px-6 z-10 container mx-auto`}
          onMouseEnter={() => setNavIsMouseOver(true)}
          onMouseLeave={() => setNavIsMouseOver(false)}
        >
          <div className={`flex items-center`}>
            <Link href="/">
              <Image
                src={headerData.logo}
                alt="Logo"
                width={80}
                height={80}
                priority
              />
            </Link>
          </div>
          {!searchFocused && (
            <div className="ml-auto md:ml-0">
              <ul className="hidden md:flex md:items-center">
                {headerData.navLinks.map((navLink, index) => (
                  <li
                    key={`${navLink.url}-${index}`}
                    className="relative mr-6 hover:underline"
                    id="nav-link"
                    onMouseEnter={() => handleMouseEnter(navLink)}
                  >
                    <a
                      href={navLink.url}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {navLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {searchQuery !== undefined && setSearchQuery !== undefined && (
            <>
              <Search
                searchFocused={searchFocused}
                setSearchFocused={setSearchFocused}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              {searchFocused && (
                <button onClick={() => setSearchFocused(false)}>Cancel</button>
              )}
            </>
          )}
        </nav>
        <div
          className={`w-screen absolute overflow-hidden`}
          id="dropdown"
          onMouseEnter={() => setDropdownIsMouseOver(true)}
          onMouseLeave={() => setDropdownIsMouseOver(false)}
        >
          <DesktopMoreMenu
            dropdown={dropdown}
            slideUp={slideUp}
            slideUpText={slideUpText}
          />
        </div>
      </header>
      {searchFocused && <SearchResults searchResults={searchResults} />}
    </>
  );
};

export default Header;

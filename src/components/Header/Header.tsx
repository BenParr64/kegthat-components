import React, { useCallback, useEffect, useRef, useState } from "react";
import { Children, HeaderProps, NavLink } from "./Header.types";
import Image from "next/image";
import DesktopMoreMenu from "./DesktopMoreMenu";
import styles from "./Header.module.css";
import Search from "../SearchInput/Search";
import SearchResults from "./SearchResults";
import Link from "next/link";
import MobileMenu from "./MobileMenu/MobileMenu";

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
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [heightAboveHeader, setHeightAboveHeader] = useState(0);

  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  const showSearch = searchQuery !== undefined && setSearchQuery !== undefined;

  const handleMouseEnter = useCallback(
    (navLink: NavLink) => {
      if (dropdown && !slideUp) {
        setSlideUpText(true);
        setTimeout(() => setSlideUpText(false), 500);
      }
      setDropdown(navLink.children);
    },
    [dropdown, slideUp]
  );

  const closeDropdown = useCallback(() => {
    setSlideUp(true);

    setTimeout(() => {
      setSlideUp(false);
      setDropdown(undefined);
    }, 450);
  }, []);

  useEffect(() => {
    if (navIsMouseOver || dropdownIsMouseOver) return;
    closeDropdown();
  }, [navIsMouseOver, dropdownIsMouseOver, closeDropdown]);

  useEffect(() => {
    if (!searchFocused) return;
    closeDropdown();
  }, [searchFocused, closeDropdown]);

  useEffect(() => {
    if (headerRef.current) {
      const headerPosition = headerRef.current.getBoundingClientRect().top;
      setHeightAboveHeader(headerPosition);
    }
  }, []);

  const handleCancelSearchQuery = () => {
    if (!setSearchQuery) return;

    setSearchQuery("");
    setSearchFocused(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuExpanded(!mobileMenuExpanded);
    if (!mobileMenuExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const slideUpSearchKeyframes = `
    @keyframes slide-up-search {
      0% {
        transform: translateY(${heightAboveHeader}px);
      }
      50% {
        transform: translateY(${heightAboveHeader}px);
      }
      100% {
        transform: translateY(0%);
      }
    }
  `;

  const headerClass = `bg-white shadow-md shadow-gray-200 z-20 ${
    styles.headerNavContainerSlideUp
  } ${searchFocused ? styles.headerNavContainerSlideUpFocused : ``} ${
    mobileMenuExpanded ? "shadow-none" : ""
  }`;

  const navClass = `w-full flex items-center justify-between px-4 md:px-6 container mx-auto`;
  const navItemClass = "relative mr-6 hover:underline";
  const navLinkClass = "text-gray-700 hover:text-gray-900";

  return (
    <>
      <style>{slideUpSearchKeyframes}</style>
      <header>
        <div
          ref={headerRef}
          className={headerClass}
          style={{
            transform: `translateY(0px)`,
            animationName: searchFocused ? `slide-up-search` : "",
          }}
        >
          <nav
            className={navClass}
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
                      className={navItemClass}
                      id="nav-link"
                      onMouseEnter={() => handleMouseEnter(navLink)}
                    >
                      <Link
                        href={navLink.url ?? "#"}
                        className={navLinkClass}
                        aria-haspopup={navLink.children ? "true" : undefined}
                        aria-expanded={
                          navLink.children && dropdown ? "true" : "false"
                        }
                      >
                        {navLink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showSearch && (
              <>
                <Search
                  searchFocused={searchFocused}
                  setSearchFocused={setSearchFocused}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                {searchFocused && (
                  <button onClick={handleCancelSearchQuery}>Cancel</button>
                )}
              </>
            )}
            <button
              className="lg:hidden w-20 text-gray-600"
              onClick={toggleMobileMenu}
            >
              {mobileMenuExpanded ? <span className="hover:underline text-xl">Close</span> : <span className="hover:underline text-xl">Menu</span>}
            </button>
          </nav>
          <nav>
            <div
              className={`hidden lg:block w-screen absolute overflow-hidden`}
              id="dropdown"
              aria-controls="dropdown-menu"
              onMouseEnter={() => setDropdownIsMouseOver(true)}
              onMouseLeave={() => setDropdownIsMouseOver(false)}
            >
              <DesktopMoreMenu
                dropdown={dropdown}
                slideUp={slideUp}
                slideUpText={slideUpText}
                id="dropdown-menu"
              />
            </div>
          </nav>
        </div>
        {mobileMenuExpanded && (
          <div
            className={`lg:hidden ${styles.headerNavContainerMobileExpanded}`}
          >
            <MobileMenu navLinks={headerData.navLinks} />
          </div>
        )}
        {/* This uses react portals to display more menu here... */}
        <div id="mobile-more-menu-root"/>
        {searchFocused && <SearchResults searchResults={searchResults} />}
      </header>
    </>
  );
};

export default Header;

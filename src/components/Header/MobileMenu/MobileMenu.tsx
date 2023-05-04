import React, { useState } from "react";
import { Children, NavLink } from "../Header.types";
import styles from "./MobileMenu.module.css";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../Icons";
import MobileMoreMenu from "./MobileMoreMenu";
export interface MobileMenuProps {
  navLinks: NavLink[];
}

const MobileMenu = ({ navLinks }: MobileMenuProps) => {
  const [currentLink, setCurrentLink] = useState<NavLink>();
  const [prevLink, setPrevLink] = useState<NavLink>();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const router = useRouter();

  const handleExpandMenu = (navLink: NavLink) => {
    if (!navLink.children?.options) {
      router.push(navLink.url);
      return;
    }

    setCurrentLink(navLink);
    setShowMoreMenu(true);
  };

  return (
    <>
      <div
        className={`shadow-md shadow-gray-200 z-30 h-full pt-20 px-5 ${styles.mobileMenuDropdown}`}
      >
        {showMoreMenu && currentLink && (
          <MobileMoreMenu
            setShowMoreMenu={setShowMoreMenu}
            prevLink={prevLink}
            setPrevLink={setPrevLink}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
          />
        )}

        <ul className=" text-black text-xl mt-8">
          {navLinks.map((navLink, index) => (
            <li key={`${navLink.url}-${index}`} id="nav-link">
              <button
                className="flex justify-between mb-2 w-full"
                onClick={() => handleExpandMenu(navLink)}
              >
                <span className="">{navLink.title}</span>
                <span className="text-gray-500">
                  <ChevronRightIcon />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;

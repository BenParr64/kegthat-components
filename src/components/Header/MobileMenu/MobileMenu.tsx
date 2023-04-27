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
  const [currentLinks, setCurrentLinks] = useState(navLinks);
  const [prevLink, setPrevLink] = useState<NavLink>();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const router = useRouter();

  const handleExpandMenu = (navLink: NavLink) => {
    if (!navLink.children?.options) {
      router.push(navLink.url);
      return;
    }

    // setCurrentLinks(navLink.children.links);
    setShowMoreMenu(true);
    setPrevLink(navLink);
  };

  return (
    <>
      <div
        className={`shadow-md shadow-gray-200 z-30 h-full pt-20 px-5 ${styles.mobileMenuDropdown}`}
      >
        {showMoreMenu && <MobileMoreMenu setShowMoreMenu={setShowMoreMenu}/>}


        <ul className=" text-black text-xl mt-8">
          {currentLinks.map((navLink, index) => (
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

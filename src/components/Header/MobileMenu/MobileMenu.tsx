import React, { useState } from "react";
import { Children, NavLink } from "../Header.types";
import styles from "./MobileMenu.module.css";
import Link from "next/link";
import ChevronRightIcon from "../../../Icons/ChevronRight";
import { useRouter } from "next/router";
export interface MobileMenuProps {
  navLinks: NavLink[];
}

const MobileMenu = ({ navLinks }: MobileMenuProps) => {
  const [currentLinks, setCurrentLinks] = useState(navLinks);
  const [prevLink, setPrevLink] = useState();

  const router = useRouter();

  const handleExpandMenu = (navLink: NavLink) => {
    if (!navLink.children?.options) {
      router.push(navLink.url);
      return;
    }

    setCurrentLinks(navLink.children.links);
  };

  return (
    <div
      className={`shadow-md shadow-gray-200 z-30 h-full pt-20 px-5 ${styles.mobileMenuDropdown}`}
    >
      <ul className=" text-black text-xl">
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
  );
};

export default MobileMenu;

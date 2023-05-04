import React from "react";
import styles from "./MobileMenu.module.css";
import ReactDOM from "react-dom";
import { ChevronLeftIcon } from "../../../Icons";
import { NavLink } from "../Header.types";

export interface MobileMoreMenuProps {
  setShowMoreMenu: (state: boolean) => void;
  prevLink?: NavLink;
  setPrevLink: (prevLink: NavLink) => void;
  currentLink: NavLink;
  setCurrentLink: (navLink: NavLink) => void;
}

const MobileMoreMenu = ({
  setShowMoreMenu,
  prevLink,
  currentLink,
  setCurrentLink,
}: MobileMoreMenuProps) => {

  const handlePrevLinks = () => {
    if (!prevLink?.children) return;
    setCurrentLink(prevLink);
  };

  const content = (
    <div className={`bg-white p-5 ${styles.mobileMoreMenu}`}>
      {prevLink ? (
        <button
          className="flex justify-between text-gray-800"
          onClick={handlePrevLinks}
        >
          <ChevronLeftIcon />
          {prevLink.title}
        </button>
      ) : (
        <button
          className="flex justify-between text-gray-800"
          onClick={() => setShowMoreMenu(false)}
        >
          <ChevronLeftIcon />
          All
        </button>
      )}
      <a href={currentLink.url} className="text-xl mt-5">
        {currentLink.title}
      </a>
    </div>
  );

  const mobileMoreMenuRoot = document.getElementById("mobile-more-menu-root");
  if (!mobileMoreMenuRoot) return null;

  return ReactDOM.createPortal(content, mobileMoreMenuRoot);
};
export default MobileMoreMenu;

import React from "react";
import styles from "./MobileMenu.module.css";
import ReactDOM from "react-dom";

export interface MobileMoreMenuProps {
  setShowMoreMenu: (state: boolean) => void;
}

const MobileMoreMenu = ({ setShowMoreMenu }: MobileMoreMenuProps) => {
  const content = (
    <div className={`bg-white ${styles.mobileMoreMenu}`}>
      <button onClick={() => setShowMoreMenu(false)}>Back</button>
      MobileMoreMenu
    </div>
  );

  const mobileMoreMenuRoot = document.getElementById("mobile-more-menu-root");
  if(!mobileMoreMenuRoot) return null;

  return ReactDOM.createPortal(content, mobileMoreMenuRoot);
};
export default MobileMoreMenu;

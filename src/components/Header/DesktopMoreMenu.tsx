import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Children } from "./Header.types";

export interface DesktopMoreMenuProps {
  dropdown?: Children;
  slideUp: boolean;
  slideUpText: boolean;
  id: string;
}

const DesktopMoreMenu = ({
  dropdown,
  slideUp,
  slideUpText,
  id,
}: DesktopMoreMenuProps) => {
  const getColumnWidth = (columns: number) => {
    switch (columns) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
      case 5:
        return "w-1/5";
      case 6:
        return "w-1/6";
      default:
        return "w-1/6";
    }
  };

  const renderSublinks = (
    subDropdown: Children | undefined,
    level: number = 1
  ) => {
    const nestedLevel = level + 1;

    return subDropdown
      ? subDropdown.links.map((link, index) => (
          <div key={index}>
            <div key={link.url} className={level === 2 ? "pl-2" : ""}>
              <a href={link.url} className="hover:text-gray-900">
                {link.title}
              </a>
              {renderSublinks(link.children, nestedLevel)}
            </div>
          </div>
        ))
      : null;
  };

  return dropdown ? (
    <div
      className={`${
        styles.dropdown
      }  text-gray-700 pt-1 pb-3 bg-white z-50 shadow-md ${
        slideUp ? styles.slideUp : ""
      }`}
      id={id}
    >
      <div
        className={`${
          slideUpText ? styles.textContainer : ""
        } container mx-auto flex flex-wrap py-2`}
      >
        {dropdown.links.map((column, index) => (
          <div
            key={index}
            className={`${getColumnWidth(dropdown.links.length)} px-4 mb-4`}
          >
            <a
              href={column.url}
              className="text-kblue-1 hover:text-gray-900 font-bold "
            >
              {column.title}
            </a>
            {renderSublinks(column.children)}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DesktopMoreMenu;

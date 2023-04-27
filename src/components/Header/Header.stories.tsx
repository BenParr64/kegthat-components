import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import data from "./headerdata.json";
import { HeaderData } from "./Header.types";
import { useState } from "react";

export default {
  title: "Kegthat Components/Header",
  parameters: {
    // jest: ['Header.test.tsx'],
  },
};

export const Default = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const headerData = data as HeaderData;
  return (
    <>
      <Header
        headerData={headerData}
        searchResults={<SearchResults />}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content />
    </>
  );
};

export const WithContentAbove = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const headerData = data as HeaderData;
  return (
    <>
      <div className="w-full h-20 bg-black"></div>
      <Header
        headerData={headerData}
        searchResults={<SearchResults />}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content />
    </>
  );
};

export const NoSearch = () => {
  const headerData = data as HeaderData;
  return (
    <>
      <div className="w-full h-20 bg-black"></div>
      <Header headerData={headerData} searchResults={<SearchResults />} />
      <Content />
    </>
  );
};

const Content = () => (
  <>
    <div className="h-screen w-full bg-gray-10 px-5 pt-5 text-base">
      <p>
        No one shall be subjected to arbitrary arrest, detention or exile.
        Everyone is entitled in full equality to a fair and public hearing by an
        independent and impartial tribunal, in the determination of his rights
        and obligations and of any criminal charge against him. No one shall be
        subjected to arbitrary interference with his privacy, family, home or
        correspondence, nor to attacks upon his honour and reputation. Everyone
        has the right to the protection of the law against such interference or
        attacks.
      </p>
    </div>
  </>
);

const SearchResults = () => <div className="">Search Results</div>;

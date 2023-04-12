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
      <Header
        headerData={headerData}
        searchResults={<SearchResults />}
      />
      <Content />
    </>
  );
};

const Content = () => (
  <>
    <div className="mt-20">Content</div>
  </>
);

const SearchResults = () => <div className="">Search Results</div>;

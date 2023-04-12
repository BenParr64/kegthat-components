export type NavLink = {
  title: string;
  url: string;
  children?: Children;
};

export type Children = {
  links: NavLink[];
  options: any;
};

export type HeaderData = {
  logo: string;
  navLinks: NavLink[];
};

export interface SearchResultsProps {
  searchResults: React.ReactNode;
}

export interface SearchProps {
  searchFocused: boolean;
  setSearchFocused: (state: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

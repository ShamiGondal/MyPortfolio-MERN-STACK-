// SearchProvider.jsx

import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const SearchContext = createContext({
  isSearchBoxVisible: false,
  setIsPageBlurred: () => {},
});

// Create a context provider to wrap your entire application
export const SearchProvider = ({ children }) => {
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isPageBlurred, setIsPageBlurred] = useState(false);

  const contextValue = {
    isSearchBoxVisible,
    setIsSearchBoxVisible,
    isPageBlurred,
    setIsPageBlurred,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook to easily access the context values
export const useSearch = () => {
  return useContext(SearchContext);
};

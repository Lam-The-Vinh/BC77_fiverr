import React, { Suspense } from "react";
import SearchPageContent from "../component/SearchPageContent";

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;

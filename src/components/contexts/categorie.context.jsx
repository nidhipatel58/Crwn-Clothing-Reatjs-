import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoryMap: {}, 
});

export const CategoriesProvider = ({ children }) => {
  const [categoryMap, setCategoryMap] = useState({}); // Fixed camelCase naming

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategoriesAndDocuments(); // Fetch the data
        console.log("Fetched categories:", categories); // Debugging
        setCategoryMap(categories); // Update state
      } catch (error) {
        console.error("Error fetching categories:", error); // Error handling
      }
    };

    fetchCategories(); // Call the function
  }, []); // Empty dependency array to run once

  const value = { categoryMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

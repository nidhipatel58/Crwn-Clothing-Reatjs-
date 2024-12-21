import { useContext } from "react";
import { CategoriesContext } from "../../components/contexts/categorie.context";
import "../shop/shop.component.style.css";
import CategoryPreview from "../../components/category.preview/category-preview.component";

function Shop() {
  const { categoryMap } = useContext(CategoriesContext); // Ensure correct context variable name

  // Check if categoryMap is empty or null/undefined
  if (!categoryMap || Object.keys(categoryMap).length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="shop-container">
      {Object.keys(categoryMap).map((title) => {
        const products = categoryMap[title];
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={products}
          ></CategoryPreview>
        );
      })}
    </div>
  );
}

export default Shop;

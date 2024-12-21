import { useContext, useEffect, useState } from "react";
import "../categories/categories.component.css";
import { CategoriesContext } from "../../components/contexts/categorie.context";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

function Categories() {
  const { category } = useParams();
  const { categoryMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoryMap[category] || []);

  useEffect(() => {
    setProducts(categoryMap[category] || []);
  }, [category, categoryMap]);

  return (
    <div className="category-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
    </div>
  );
}

export default Categories;

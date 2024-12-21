import "../category.preview/category-preview.style.css";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

function CategoryPreview({ title, products = [] }) {
  // Set default value for products
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toLowerCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard> // Use product.id as key
          ))}
      </div>
    </div>
  );
}

export default CategoryPreview;

import "./product-card.style.css";
import { useContext } from "react";
import { CartContext } from "../../components/contexts/cart.context";
import Button, { Button_TYPE_CLASSES } from "../button/button.component";

function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={"${name}"} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={Button_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCard;

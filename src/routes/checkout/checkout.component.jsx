import "../checkout/checkout.style.css";
import { useContext } from "react";
import { CartContext } from "../../components/contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

function Checkout() {
  const { cartItem, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItem.map((item) => {
        return <CheckoutItem key={cartItem.id} cartItem={item} />;
      })}
      <span className="total">Total:{cartTotal}</span>
    </div>
  );
}

export default Checkout;

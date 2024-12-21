import "../cart-dropdown/cart-dropdown.style.css";
import CartItem from "../../components/cart-item/cart-item.conponent";
import { CartContext } from "../../components/contexts/cart.context";
import Button from "../button/button.component";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function CartDropdown() {
  const { cartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const goCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div className="cart-dropdown-container">
        <div className="cart-items">
          {cartItem && cartItem.length > 0 ? (
            cartItem.map((item) => <CartItem key={item.id} cartitem={item} />)
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <Button onClick={goCheckoutHandler}>Go to checkout</Button>
      </div>
    </div>
  );
}

export default CartDropdown;

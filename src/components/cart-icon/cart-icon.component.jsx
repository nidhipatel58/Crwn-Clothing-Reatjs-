import "../cart-icon/cart-icon.style.css";
import { CartContext } from "../../components/contexts/cart.context";
import { useContext } from "react";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <svg
        class="shopping-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3h2l3 9h10l3-9h2"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3l1 18h16l1-18"
        />
      </svg>

      {/* <i class="fa-solid fa-credit-card" className="shopping-icon"></i> */}
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;

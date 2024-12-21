import "../cart-item/cart-item.style.css";

function CartItem({ cartitem }) {
  // Add a fallback to handle undefined or null cartitem
  if (!cartitem) {
    return <div>No item to display</div>;
  }

  const { name, quantity, imageUrl, price } = cartitem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={"${name}"} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity}x ${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;

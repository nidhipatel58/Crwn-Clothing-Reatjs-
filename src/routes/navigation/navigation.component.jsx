import { Outlet, } from "react-router-dom";
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../components/contexts/user.context";
import { CartContext } from "../../components/contexts/cart.context";
import { signOutUser } from "../../firebase/firebase.utils";
import {
  NavigationContainer,
  NavLinks,
  NavItemContainer,
  LogoContainer,
} from "./navigation.component.style";

function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <div>
      <Fragment>
        <NavigationContainer className="navigation">
          <LogoContainer to={"/"}>LOGO</LogoContainer>
          <NavItemContainer>
            <NavLinks to="/shop">SHOP</NavLinks>
            <NavLinks to="/">CONTACT</NavLinks>
            {currentUser ? (
              <NavLinks as="span" onClick={signOutHandler}>
                SIGN OUT
              </NavLinks>
            ) : (
              <NavLinks to="/auth">SINGIN</NavLinks>
            )}
            <CartIcon />
          </NavItemContainer>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    </div>
  );
}

export default Navigation;

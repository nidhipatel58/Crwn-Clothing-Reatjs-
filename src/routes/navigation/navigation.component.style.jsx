import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 15px;
`;

export const LogoContainer = styled(Link)`
  padding: 25px;
  font-size: 35px;
  color: black;
  font-weight: 600;
`;

export const NavItemContainer = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

export const NavLinks = styled(Link)`
  padding: 0 22px;
  margin-top: 10px;
`;

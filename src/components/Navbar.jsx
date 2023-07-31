import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../../responsive";
import CartContext from "../Context/CartContext";
import { TokenRequest } from "../../requestMethod";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const LinkItem = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover {
    color: red;
  }
`;

const LogoutButton = styled(LinkItem)`
  /* Additional styles specific to LogoutButton if needed */
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Navbar = () => {
  const { item } = useContext(CartContext);
  const [cartItem, setCartItem] = useState(null);
  const TOKEN = Cookies.get("userInfo");
  const user = TOKEN ? jwtDecode(TOKEN).username : null;

  const handleLogout = () => {
    Cookies.remove("userInfo");
    setCartItem(null);
    window.location.reload();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = TOKEN ? await TokenRequest.get(`/carts/find/`) : [];
        setCartItem(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [item]);

  const totalQuantity = cartItem
    ? cartItem.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      )
    : 0;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          {/* Use Link component instead of <a> tag */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>LAMADA.</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              <LinkItem>{user.toUpperCase()}</LinkItem>
              {/* Use LogoutButton styled component */}
              <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
            </>
          ) : (
            <>
              {/* Use Link components for navigation */}
              <Link to="/auths/register" style={{ textDecoration: "none" }}>
                <LinkItem>REGISTER</LinkItem>
              </Link>
              <Link to="/auths/login" style={{ textDecoration: "none" }}>
                <LinkItem>SIGN IN</LinkItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <LinkItem>
              <Badge color="secondary" badgeContent={totalQuantity}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </LinkItem>
          </Link>
          {user ? (
            <Link to="/orders">
              <LinkItem>
                <StoreIcon />
              </LinkItem>
            </Link>
          ) : null}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

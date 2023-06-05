import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import {
  Container,
  Header,
  Logo,
  MenuButton,
  Main,
  Footer,
  NavMobile,
  Nav,
  Content,
  NavItem,
} from "./SharedLayout.styled";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import imagess from "../images/logo3.png";
import { ToastContainer } from "react-toastify";
import { Loader } from "./Loader";

export const SharedLayout = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Content>
      <Header>
        <Container>
          <Logo to="/">
            <img src={imagess} alt="logo" width={300} />
          </Logo>
          <Nav>
            <NavItem to="/">Головна</NavItem>
            <NavItem to="/order">Замовити перевезення</NavItem>
            <NavItem to="/about">Про компанію</NavItem>
          </Nav>

          <MenuButton onClick={toggleMenu}>
            {isMenuOpen ? <CancelIcon /> : <MenuIcon />}
          </MenuButton>
        </Container>

        <NavMobile className={isMenuOpen ? "is-visible" : undefined}>
          <NavItem to="/">Головна</NavItem>
          <NavItem to="/order">Замовити перевезення</NavItem>
          <NavItem to="/about">Про компанію</NavItem>
        </NavMobile>
        <ToastContainer />
      </Header>
      <Main>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </Main>
      <Footer>
        <Container>
          <div>&copy; 2023 Логістична компанія "LOGICTRANS"</div>

          <ul>
            <li>Наші контакти</li>
            <li>
              <a href="tel:+380123456789">+380123456789</a>
            </li>
            <li>
              <a href="email:info@logictrans.com">info@logictrans.com</a>
            </li>
            <li>вул. Логістична, 1, м. Київ, Україна</li>
          </ul>
        </Container>
      </Footer>
    </Content>
  );
};

export default SharedLayout;

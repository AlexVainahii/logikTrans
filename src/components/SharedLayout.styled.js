import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;
export const Nav = styled.nav`
  display: flex;

  @media (max-width: 465px) {
    display: none;
  }
`;
export const Header = styled.header`
  background: linear-gradient(to bottom, #000000, #333333);
  padding: 8px 0;
  border-bottom: 1px solid black;

  > ${Container} {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    @media (max-width: 845px) {
      flex-direction: column;
      text-align: center;
    }
  }

  > ${Nav} {
    display: flex;
    @media (max-width: 845px) {
      justify-content: center;
      padding: 0;
    }
    @media (max-width: 465px) {
      display: none;
    }
  }
`;

export const Logo = styled(Link)`
  font-weight: 700;
  margin: 0;
  margin-left: 50px;
  text-decoration: none;
  color: black;
  @media (max-width: 845px) {
    margin-left: 0;
  }
`;
export const Links = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 465px) {
    display: block;
  }
`;

export const NavMobile = styled.nav`
  display: none;

  @media (max-width: 465px) {
    background: linear-gradient(to bottom, #000000, #333333);
    padding: 16px;
    &.is-visible {
      display: block;
    }

    ${NavItem} {
      display: block;
      padding: 8px 0;
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      text-align: center;

      &.active {
        color: white;
        background-color: orangered;
      }
    }
  }
`;

export const Main = styled.div`
  flex: 1 0 auto;
  margin: 0 auto;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
`;

export const Footer = styled.footer`
  background: linear-gradient(to bottom, #000000, #333333);
  color: #fff;
  flex-shrink: 0;
  padding: 20px;

  > ${Container} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  div {
    flex: 1 1 100%;
    text-align: center;
    margin-bottom: 10px;

    @media (min-width: 768px) {
      flex: 0 0 50%;
      text-align: left;
    }

    @media (min-width: 1200px) {
      flex: 0 0 33.33%;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      margin: 0 10px;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
  }
`;

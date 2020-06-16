import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "./Container";

const StyledNavigation = styled(Container)`
  ul {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
  }
  ul li {
    display: inline;
    padding: 0;
    margin: 0 10px 0 0;
  }
`;

const Nav = () => (
  <StyledNavigation>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/music">Music</Link>
      </li>
    </ul>
  </StyledNavigation>
);

export default Nav;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { logout } from "src/actions/userActions";
import logo from "src/assets/images/logo.png";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [searchValue, setsearchValue] = useState(null);
  function onChangeValue(e) {
    setsearchValue(e.target.value);
  }
  function onSearch(e) {
    e.preventDefault();
    if (searchValue) {
      //   history.push(`/Products/search?q=${searchValue}`);
      history.push(`/`);
      setsearchValue("");
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        variant="dark"
        className="text-light"
        expand="lg"
        collapseOnSelect
        sticky="top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/book">
              <Image src={logo} alt="Logo" width="80" className="avatar" />
            </Navbar.Brand>
          </LinkContainer>
          <form class="nav-search" onSubmit={onSearch}>
            <input
              type="text"
              class="nav-input"
              name="q"
              value={searchValue}
              placeholder="Nhập từ khóa cần tìm"
              onChange={onChangeValue}
            />
            <button type="submit" class="btn-search">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ml-auto" navbarScroll>
              {/* <Nav.Link to="/book">Book</Nav.Link>
              <Nav.Link to="/about">About</Nav.Link> */}
              <LinkContainer to="/book">
                <Nav.Link>Book</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              {/* <Nav.Link to="/contact">Contact</Nav.Link> */}
              <LinkContainer to="/contact">
                <Nav.Link to="/contact">Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <Image
                    src={userInfo.avatar}
                    width="40"
                    height="40"
                    roundedCircle
                  />
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

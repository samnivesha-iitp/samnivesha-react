import React, { useState, useContext } from "react";
import "../css/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "./authContext";
const axios = require("axios");
import { HashLink } from "react-router-hash-link";

const config = {
  environment: Boolean(process.env.NODE_ENV !== "production")
};

const styles = {
  nav: {
    backgroundColor: "unset",
    position: "absolute",
    width: "100%"
  }
};
const Header = props => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const [isMobile, setIsMobile] = useState("");
  const hideMenu = () => {
    setIsMobile("");
  };
  const showMenu = () => {
    setIsMobile("is-active");
  };
  const logout = () => {
    Cookies.remove("uid");
    setIsAuthenticated(false);
    setUser("");
    axios
      .post("/logout")
      .then(res => {
        if (res.data == "success") {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const Prefetch = config.environment ? "true" : "false";
  return (
    <nav
      className="navbar is-transparent is-spaced"
      role="navigation"
      aria-label="main navigation"
      style={styles.nav}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" prefetch={Prefetch} className="navbar-item">
            <img
              src="/images/samnivesha.png"
              alt="Bulma Rent"
              width="20"
              height="34"
            />
          </Link>

          <a
            role="button"
            className={`navbar-burger burger ${isMobile}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarTopMain"
            onClick={() => {
              if (isMobile == "is-active") {
                hideMenu();
              } else {
                showMenu();
              }
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${isMobile}`} id="navbarTopMain">
          <div className="navbar-end">
            <Link
              to="/"
              prefetch={Prefetch}
              className="navbar-item has-text-weight-semibold"
              onClick={hideMenu}
            >
              Home
            </Link>
            <Link
              to="/blog"
              prefetch={Prefetch}
              className="navbar-item has-text-weight-semibold"
              onClick={hideMenu}
            >
              <span>Blog</span>
              <span className="tag is-success m-l-5">NEW</span>
            </Link>

            <HashLink
              to={"/#event"}
              className="navbar-item has-text-weight-semibold"
              onClick={hideMenu}
            >
              Events
            </HashLink>
            <HashLink
              to={"/#guestLecture"}
              className="navbar-item has-text-weight-semibold"
              onClick={hideMenu}
            >
              Guest Lecture
            </HashLink>
            <HashLink
              to={"/#workshop"}
              className="navbar-item has-text-weight-semibold"
              onClick={hideMenu}
            >
              Workshop
            </HashLink>
            
            {/* <Link href="/schedule">
              <a className="navbar-item has-text-weight-semibold">Schedule</a>
            </Link> */}

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Profile
                </Link>
                <div className="navbar-item">
                  <Link
                    to="/logout"
                    prefetch={Prefetch}
                    className="button is-warning"
                    onClick={e => {
                      e.preventDefault();
                      hideMenu();
                      logout();
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <>
                {/* <Link
                  to="/sponsors"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Sponsors
                </Link> */}

                <Link
                  to="/contact"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Contact Us
                </Link>
                <div className="navbar-item">
                  <Link
                    to="/signup"
                    prefetch={Prefetch}
                    className="button is-primary"
                    onClick={hideMenu}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;

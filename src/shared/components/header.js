import React, { useState, useContext } from "react";
import "../css/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "./authContext";
const axios = require("axios");
import { HashLink } from "react-router-hash-link";

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
  const Prefetch = "true";
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
          <div className="navbar-start">
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
              Blog
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <HashLink
                to={"/#event"}
                className="navbar-link has-text-weight-semibold"
                onClick={hideMenu}
              >
                Events
              </HashLink>
              <div className="navbar-dropdown is-boxed">
                <HashLink
                  to={"/#guestLecture"}
                  className="navbar-item has-text-weight-semibold "
                  onClick={hideMenu}
                >
                  Guest Lecture
                </HashLink>
                <hr className="navbar-divider " />
                <HashLink
                  to={"/#workshop"}
                  className="navbar-item has-text-weight-semibold  "
                  onClick={hideMenu}
                >
                  Workshop
                </HashLink>
              </div>
            </div>
            <Link
              to="/schedule"
              prefetch={Prefetch}
              onClick={hideMenu}
              className="navbar-item has-text-weight-semibold"
            >
              <span>Schedule</span>
              <span className="tag is-success m-l-5">NEW</span>
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/sponsors"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Sponsors
                </Link>

                <Link
                  to="/contact"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Contact Us
                </Link>
                <Link
                  to="/team"
                  prefetch={Prefetch}
                  className="navbar-item has-text-weight-semibold"
                  onClick={hideMenu}
                >
                  Team
                </Link>
              </>
            )}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScyCLOB4WXRGooNLU57SOWvWoq-CeVVWS9i346n14CmaJI9dA/viewform"
              target="_blank"
              className="navbar-item has-text-weight-semibold"
            >
              Payment
            </a>
            <Link
              className="navbar-item has-text-weight-semibold"
              to="/misc"
              prefetch={Prefetch}
              onClick={hideMenu}
            >
              Instructions
            </Link>
          </div>
          {isAuthenticated ? (
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
          ) : (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    to="/signup"
                    prefetch={Prefetch}
                    className="button is-primary"
                    onClick={hideMenu}
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    prefetch={Prefetch}
                    className="button is-light"
                    onClick={hideMenu}
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;

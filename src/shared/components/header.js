import React from "react";
import { Link } from "react-router-dom";

const styles = {
  nav: {
    backgroundColor: "#f5f5f5"
  }
};
const Header = () => {
  return (
    <nav
      className="navbar is-transparent is-spaced"
      role="navigation"
      aria-label="main navigation"
      style={styles.nav}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src="/images/samnivesha.png"
              alt="Bulma Rent"
              width="34"
              height="20"
            />
          </Link>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarTopMain"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu" id="navbarTopMain">
          <div className="navbar-end">
            <Link to="/blog" className="navbar-item has-text-weight-semibold">
              <span>Blog</span>
              <span className="tag is-success m-l-5">NEW</span>
            </Link>
            <Link to="/about" className="navbar-item has-text-weight-semibold">
              About
            </Link>
            <Link
              to="/contact"
              className="navbar-item has-text-weight-semibold"
            >
              Contact Us
            </Link>
            <Link
              to="/schedule"
              className="navbar-item has-text-weight-semibold"
            >
              Schedule
            </Link>
            <div className="navbar-item">
              <Link to="/login" className="button is-primary">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;

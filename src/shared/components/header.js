import React from "react";

const Header = () => {
  return (
    <div className="hero-head">
      <nav
        className="navbar is-transparent is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img
                src="/images/samnivesha.png"
                alt="Bulma Rent"
                width="34"
                height="20"
              />
            </a>

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
              <a href="/blog" className="navbar-item has-text-weight-semibold">
                <span>Blog</span>
                <span className="tag is-success m-l-5">NEW</span>
              </a>
              <a href="/about" className="navbar-item has-text-weight-semibold">
                About
              </a>
              <a href="/contact" className="navbar-item has-text-weight-semibold">
                Contact Us
              </a>
              <a href="/schedule" className="navbar-item has-text-weight-semibold">
                Schedule
              </a>
              <div className="navbar-item">
                <a href="/login" className="button is-primary">
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;

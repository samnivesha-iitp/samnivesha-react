import React from "react";
import PropTypes from "prop-types";

// component
import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;

import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = props => {
  return (
    <>
      <section className="hero is-fullheight is-light">
        <Header />
        {props.children}
        <Footer />
      </section>
    </>
  );
};
export default Layout;

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import errorSvg from "./images/error.svg";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Samnivesha :: Error 404 </title>
        <link rel="stylesheet" preload href="/css/error.css" />
      </Helmet>
      <div className="hero is-relative is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-gapless is-vcentered">
              <div className="column error-wrap error-centered has-text-centered">
                <div className="bg-404">404</div>
                <img src={errorSvg} alt="" />
                <div className="error-caption">
                  <h2>Oops, We couldn't find that page.</h2>
                  <p>
                    Please try again or contact the website administrator to get
                    some help.
                  </p>
                  <div className="button-wrap">
                    <Link
                      to="/"
                      className="button button-cta btn-outlined is-bold btn-align secondary-btn rounded raised"
                    >
                      Back to Homepage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;

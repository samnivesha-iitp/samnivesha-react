// external
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// components
import coreCSS from "shared/css/core.module.css";

const Workshop = ({ onClick, isLoading }) => {
  const loadingStatus = isLoading ? "is-loading" : "";

  return (
    <section
      className={`section ${coreCSS["section"]}  ${coreCSS["section-feature-grey-accent"]} is-fullheight`}
      id="workshop"
    >
      <div className="container">
        <div className={`${coreCSS["section-title-wrapper"]}  has-text-centered`}>
          <h2 className={coreCSS["section-title-landing"]}>Workshop</h2>
          <h4>Ignite the spirit with interactive workshops</h4>
        </div>
        <div className={coreCSS["content-wrapper"]}>
          <div className={`columns is-vcentered ${coreCSS["pb-40"]} ${coreCSS["pt-40"]}`}>
            <div className="column is-6 is-offset-1">
              <div
                className={`title ${coreCSS["quick-feature"]} ${coreCSS["is-handwritten"]} ${coreCSS["text-bold"]}`}
              >
                <div>
                  AutoCAD<sup>®</sup>
                </div>
              </div>
              <div className={`${coreCSS["title-divider"]} ${coreCSS["is-small"]}`}></div>
              <span className={coreCSS["section-feature-description"]}>
                AutoCAD is computer-aided design (CAD) software that architects, engineers and
                construction professionals rely on to create precise 2D and 3D drawings. It helps us
                in drafting and editing 2D geometry and 3D models with solids, surfaces and mesh
                objects.The industry expects the candidates to be familiar with the latest skills
                and techniques related to any type of designing.
              </span>
              <div className={`${coreCSS["pt-10"]} ${coreCSS["pb-10"]}`}>
                <a
                  href="http://www.ndsworld.in/"
                  rel="noreferrer"
                  target="_blank"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["is-link"]} ${coreCSS["btn-more"]} ${coreCSS["color-primary"]}`}
                >
                  Learn more
                  <i className={`${coreCSS["sl"]} ${coreCSS["sl-icon-arrow-right"]}`}></i>
                </a>
                <a
                  href="/pdf/autocad.pdf"
                  target="_blank"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["is-link"]} ${coreCSS["btn-more"]} ${coreCSS["color-primary"]}`}
                >
                  Prerequisite
                </a>
                <Link
                  onClick={onClick}
                  to="/add/workshop?name=autocad"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["btn-more"]} ${coreCSS["is-link"]} ${coreCSS["color-primary"]} ${loadingStatus}`}
                >
                  Register
                  <i className={`${coreCSS["sl"]} ${coreCSS["sl-icon-arrow-right"]}`}></i>
                </Link>
              </div>
            </div>
            <div className="column is-4 is-offset-1">
              <img className="" src="/images/autocad.webp" alt="" />
            </div>
          </div>
          <div className={`columns is-vcentered ${coreCSS["pb-40"]} ${coreCSS["pt-40"]}`}>
            <div className="column is-4 is-offset-1">
              <img className="" src="/images/sap.webp" alt="" />
            </div>
            <div className="column is-6 is-offset-1">
              <div
                className={`title ${coreCSS["quick-feature"]} ${coreCSS["is-handwritten"]} ${coreCSS["text-bold"]}`}
              >
                <div>
                  SAP2000<sup>®</sup>
                </div>
              </div>
              <div className={`${coreCSS["title-divider"]} ${coreCSS["is-small"]}`}></div>
              <span className={coreCSS["section-feature-description"]}>
                From its 3D object based graphical modeling environment to the wide variety of
                analysis and design options completely integrated across one powerful user
                interface, SAP2000 has proven to be the most integrated, productive and practical
                general purpose structural program on the market today. Complex Models can be
                generated and meshed with powerful built in templates. We&apos;ll keep you up with
                the pace of industry standards and you will learn along the way how it&apos;s easy
                to generate complex model in a very simple,easy and intutive way with the help of
                SAP2000.
              </span>
              <div className={`${coreCSS["pt-10"]} ${coreCSS["pb-10"]}`}>
                <a
                  href="https://www.csiamerica.com/products/sap2000"
                  rel="noreferrer"
                  target="_blank"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["is-link"]} ${coreCSS["btn-more"]} ${coreCSS["color-primary"]}`}
                >
                  Learn more
                  <i className={`${coreCSS["sl"]} ${coreCSS["sl-icon-arrow-right"]}`}></i>
                </a>
                <a
                  href="/pdf/sap.pdf"
                  target="_blank"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["is-link"]} ${coreCSS["btn-more"]} ${coreCSS["color-primary"]}`}
                >
                  Prerequisite
                </a>
                <Link
                  onClick={onClick}
                  to="/add/workshop?name=sap"
                  className={`button is-link ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["btn-more"]} ${coreCSS["is-link"]} ${coreCSS["color-primary"]} ${loadingStatus}`}
                >
                  Register
                  <i className={`${coreCSS["sl"]} ${coreCSS["sl-icon-arrow-right"]}`}></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Workshop.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Workshop;

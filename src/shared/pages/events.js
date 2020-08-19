// external
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// utils
const { formatArrayIntoGroups } = require("utils/findArray");
// data
const data = require("../../../archieve/data/event");
import coreCSS from "shared/css/core.module.css";

const Events = ({ onClick, isLoading }) => {
  const loadingStatus = isLoading ? "is-loading" : "";

  return (
    <section className={`section bg-white is-medium ${coreCSS["section"]}`} id="event">
      <div className="container">
        <div
          className={`${coreCSS["section-title-wrapper"]} has-text-centered`}
          style={{ paddingBottom: "40px" }}
        >
          <h2 className={coreCSS["section-title-landing"]}>Events</h2>
          <h4>Showcase your technical brilliance at unparalleled multitude of events.</h4>
        </div>
        <div className={coreCSS["content-wrapper"]}>
          {formatArrayIntoGroups(data, { count: 3 }).map((v, i) => {
            return (
              <div className="columns" key={i}>
                {v.map((e) => (
                  <div className="column is-4" key={e.id}>
                    <div className={`${coreCSS["event-card"]} ${coreCSS["is-wavy"]}`}>
                      <div className={coreCSS["img-container"]}>
                        <img src={e.img} alt="" data-demo-src={e.img} />
                      </div>
                      <div className={coreCSS["card-text"]}>
                        <div className={`${coreCSS["text"]} ${coreCSS["text-container"]}`}>
                          <div className={`${coreCSS["text"]} ${coreCSS["text-header"]}`}>
                            <h2 className={`${coreCSS["text"]} ${coreCSS["text-title"]}`}>
                              {e.title}
                            </h2>
                            <p className={`${coreCSS["text"]} ${coreCSS["text-subtitle"]}`}>
                              {e.subtitle}
                            </p>
                          </div>
                          <div className={`${coreCSS["text"]} ${coreCSS["text-details"]}`}>
                            <p className={`${coreCSS["text"]} ${coreCSS["text-description"]}`}>
                              {e.description}
                            </p>
                            <a
                              href={e.pdflink}
                              target="_blank"
                              rel="noreferrer"
                              className={`button ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["btn-more"]} is-link ${coreCSS["is-link"]} ${coreCSS["color-accent"]} ${coreCSS["mt-10"]} ${coreCSS["mb-10"]}`}
                            >
                              Event details
                              <i className="sl sl-icon-arrow-right"></i>
                            </a>
                            <Link
                              onClick={onClick}
                              to={`/event/${e.id}`}
                              className={`button ${coreCSS["button"]} ${coreCSS["btn-align"]} ${coreCSS["btn-more"]} is-link ${coreCSS["is-link"]} ${coreCSS["color-accent"]} ${coreCSS["mt-10"]} ${coreCSS["mb-10"]} ${loadingStatus}`}
                            >
                              Register
                              <i className="sl sl-icon-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Events.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default Events;

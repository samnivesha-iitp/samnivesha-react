// external
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// utils
const { formatArrayIntoGroups } = require("utils/findArray");
// data
const data = require("../../../archieve/data/event");

const Events = ({ onClick, isLoading }) => {
  const loadingStatus = isLoading ? "is-loading" : "";

  return (
    <section className="section bg-white is-medium" id="event">
      <div className="container">
        <div className="section-title-wrapper has-text-centered" style={{ paddingBottom: "40px" }}>
          <h2 className="section-title-landing">Events</h2>
          <h4>Showcase your technical brilliance at unparalleled multitude of events.</h4>
        </div>
        <div className="content-wrapper">
          {formatArrayIntoGroups(data, { count: 3 }).map((v, i) => {
            return (
              <div className="columns" key={i}>
                {v.map((e) => (
                  <div className="column is-4" key={e.id}>
                    <div className="event-card is-wavy">
                      <div className="img-container">
                        <img src={e.img} alt="" data-demo-src={e.img} />
                      </div>
                      <div className="card-text">
                        <div className="text text-container">
                          <div className="text text-header">
                            <h2 className="text text-title">{e.title}</h2>
                            <p className="text text-subtitle">{e.subtitle}</p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">{e.description}</p>
                            <a
                              href={e.pdflink}
                              target="_blank"
                              rel="noreferrer"
                              className={
                                "button btn-align btn-more is-link color-accent mt-10 mb-10"
                              }
                            >
                              Event details
                              <i className="sl sl-icon-arrow-right"></i>
                            </a>
                            <Link
                              onClick={onClick}
                              to={`/event/${e.id}`}
                              className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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

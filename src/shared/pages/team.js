// external
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// data
import teamMembers from "../../../archieve/data/members";
// css
import team from "../css/team.module.css";
// utils
const { formatArrayIntoGroups } = require("utils/findArray");

const Team = () => {
  const style = {
    nav: {
      backgroundColor: "unset",
      position: "absolute",
      width: "100%",
    },
  };
  return (
    <>
      <nav className="navbar is-transparent is-spaced" style={style.nav}>
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <button className="button is-primary is-rounded">Back to Home</button>
            </Link>
          </div>
        </div>
      </nav>
      <section className="section is-medium hero">
        <div className="hero-body">
          <div className="container">
            <div className="section-title-wrapper has-text-centered">
              <h2 className="title is-1" style={{ fontSize: "4rem" }}>
                TEAM!
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="section is-medium section-feature-grey">
        <div className="container">
          <div className={team["content-wrapper"]}>
            <div className={team["image-grid"]} style={{ fontSize: "14px" }}>
              <div className={team["team-footer"]}>
                <h3 className="title is-3 has-text-centered">Core Committee</h3>
                <br />
                <br />
                {formatArrayIntoGroups(teamMembers.core_committee, { count: 3 }).map((v, i) => {
                  return (
                    <div className="columns is-vcentered" key={i}>
                      {v.map((v) => (
                        <CoreMember member={v} key={v.name.firstName} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Team;

export const CoreMember = ({ member }) => {
  return (
    <div className="column is-4" key={member.name.firstName}>
      <figure className={team["team-hover"]}>
        <img src={member.avatarURL} alt="" data-demo-src={member.avatarURL} />
        <figcaption>
          <h2>
            {member.name.firstName}
            <span className={team["ml-5"]}> {member.name.lastName} </span>
          </h2>
          <p className={team["icon-links"]}>
            <a href="#">
              <span className={team["icon-dribbble"]}></span>
            </a>
            <a href="#">
              <span className={team["icon-linkedin"]}></span>
            </a>
            <a href="#">
              <span className={team["icon-twitter"]}></span>
            </a>
          </p>
          <p className={team["description"]}>{member.field}</p>
        </figcaption>
      </figure>
    </div>
  );
};
CoreMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.shape({ firstName: PropTypes.string.isRequired, lastName: PropTypes.string }),
    avatarURL: PropTypes.string,
    field: PropTypes.string,
  }),
};

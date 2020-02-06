import React from "react";
import Helmet from "react-helmet";
import teamMembers from "./teamData";
import TeamStyle from "./css/team.style";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Team = () => {
  const style = {
    nav: {
      backgroundColor: "unset",
      position: "absolute",
      width: "100%"
    }
  };
  return (
    <>
      <Helmet>
        <title>Team</title>
        <link rel="stylesheet" href="/css/brands.min.css" />
      </Helmet>
      <nav className="navbar is-transparent is-spaced" style={style.nav}>
        <div className="container">
          <div className="navbar-brand">
            <Link to={"/"} className="navbar-item">
              <button className="button is-primary is-rounded">
                Back to Home
              </button>
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
          <div className="content-wrapper">
            <div className="image-grid" style={{ fontSize: "14px" }}>
              <div className="team-footer">
                <h3 className="title is-3 has-text-centered">Core Committee</h3>
                <br />
                <br />
                <div className="columns is-vcentered">
                  <CoreMember member={teamMembers.core_committee[0]} />
                  <CoreMember member={teamMembers.core_committee[2]} />
                  <CoreMember member={teamMembers.core_committee[1]} />
                </div>
                <div className="columns is-vcentered">
                  <CoreMember member={teamMembers.core_committee[3]} />
                  <CoreMember member={teamMembers.core_committee[4]} />
                  <CoreMember member={teamMembers.core_committee[5]} />
                </div>
                <div className="columns is-vcentered">
                  <CoreMember member={teamMembers.core_committee[6]} />
                  <CoreMember member={teamMembers.core_committee[7]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`${TeamStyle.style}`}</style>
      </div>
    </>
  );
};
export default Team;
export const CoreMember = ({ member }) => {
  return (
    <div className="column is-4" key={member.name.firstName}>
      <figure className="team-hover">
        <img src={member.avatarURL} alt="" data-demo-src={member.avatarURL} />
        <figcaption>
          <h2>
            {member.name.firstName}
            <span className="ml-5"> {member.name.lastName} </span>
          </h2>
          <p className="icon-links">
            <a href="https://bulkitv2.cssninja.io/_components-sections-team.html#">
              <span className="icon-dribbble"></span>
            </a>
            <a href="https://bulkitv2.cssninja.io/_components-sections-team.html#">
              <span className="icon-linkedin"></span>
            </a>
            <a href="https://bulkitv2.cssninja.io/_components-sections-team.html#">
              <span className="icon-twitter"></span>
            </a>
          </p>
          <p className="description">{member.field}</p>
        </figcaption>
      </figure>
    </div>
  );
};

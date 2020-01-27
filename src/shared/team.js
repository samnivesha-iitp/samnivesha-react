import React from "react";
import Helmet from "react-helmet";
import TeamStyle from "./css/team.style";
const Team = () => {
  return (
    <>
      <Helmet>
        <title>Team</title>
      </Helmet>

      <div className="section is-medium section-feature-grey">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="title section-title has-text-centered dark-text text-bold">
              Meet the Team
            </h2>
          </div>

          <div className="content-wrapper">
            <div className="image-grid">
              <div className="team-footer">
                <div className="columns is-vcentered">
                  <div className="column is-4">
                    <figure className="team-hover">
                      <img
                        src="assets/img/demo/team/one.jpg"
                        alt=""
                        data-demo-src="assets/img/demo/team/one.jpg"
                      />
                      <figcaption>
                        <h2>
                          Alex <span className="ml-5">Walsh</span>
                        </h2>
                        <p className="icon-links">
                          <a href="#">
                            <span className="icon-dribbble"></span>
                          </a>
                          <a href="#">
                            <span className="icon-linkedin"></span>
                          </a>
                          <a href="#">
                            <span className="icon-twitter"></span>
                          </a>
                        </p>
                        <p className="description">Lead Designer</p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="column is-4">
                    <figure className="team-hover">
                      <img
                        src="assets/img/demo/team/two.jpg"
                        alt=""
                        data-demo-src="assets/img/demo/team/two.jpg"
                      />
                      <figcaption>
                        <h2>
                          Naseem <span className="ml-5">Al Wahabi</span>
                        </h2>
                        <p className="icon-links">
                          <a href="#">
                            <span className="icon-dribbble"></span>
                          </a>
                          <a href="#">
                            <span className="icon-linkedin"></span>
                          </a>
                          <a href="#">
                            <span className="icon-twitter"></span>
                          </a>
                        </p>
                        <p className="description">Lead Developer</p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="column is-4">
                    <figure className="team-hover">
                      <img
                        src="assets/img/demo/team/three.jpg"
                        alt=""
                        data-demo-src="assets/img/demo/team/three.jpg"
                      />
                      <figcaption>
                        <h2>
                          Dominic <span className="ml-5">Grilio</span>
                        </h2>
                        <p className="icon-links">
                          <a href="#">
                            <span className="icon-dribbble"></span>
                          </a>
                          <a href="#">
                            <span className="icon-linkedin"></span>
                          </a>
                          <a href="#">
                            <span className="icon-twitter"></span>
                          </a>
                        </p>
                        <p className="description">Head of Sales</p>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`${TeamStyle.style}`}</style>
    </>
  );
};
export default Team;

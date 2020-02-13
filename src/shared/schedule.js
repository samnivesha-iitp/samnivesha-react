import React from "react";
import Layout from "./components/layout";
import Helmet from "react-helmet";

const Schedule = () => {
  return (
    <Layout>
      <Helmet>
        <title>Schedule </title>
      </Helmet>
      <section className="hero is-fullheight is-light">
        <div className="hero-body " style={{ alignItems: "unset" }}>
          <div className="container">
            <h2 className="title is-4" style={{ paddingTop: "40px" }}>
              Samnivesha Schedule
            </h2>
            <div className="column">
              <h3 className="title is-5">
                <strong>Day 0 -</strong> 14 Feb.
                <br />
              </h3>
              <figure
                className="image"
                style={{ maxWidth: "1000px", margin: "0px auto" }}
              >
                <img className="is-2by1" src="/images/day0.jpeg" />
              </figure>
            </div>
            <hr style={{ backgroundColor: "blue" }} />
            <div className="column">
              <h3 className="title is-5">
                <strong>Day 1 -</strong> 15 Feb.
                <br />
              </h3>
              <figure
                className="image "
                style={{ maxWidth: "1000px", margin: "0px auto" }}
              >
                <img className="is-2by1" src="/images/day1.jpeg" />
              </figure>
            </div>
            <hr style={{ backgroundColor: "blue" }} />
            <div className="column">
              <h3 className="title is-5">
                <strong>Day 2 -</strong> 16 Feb.
                <br />
              </h3>
              <figure
                className="image "
                style={{ maxWidth: "1000px", margin: "0px auto" }}
              >
                <img className="is-2by1" src="/images/day2.jpeg" />
              </figure>
            </div>
            <hr style={{ backgroundColor: "blue" }} />
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Schedule;

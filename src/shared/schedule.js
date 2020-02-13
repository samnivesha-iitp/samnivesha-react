import React from "react";
import Layout from "./components/layout";
import Helmet from "react-helmet";

const Schedule = () => {
  const styles = {
    span: {
      fontWeight: "300",
      fontSize: "16px"
    },
    image: { maxWidth: "1000px", margin: "0px auto" },
    hr: { backgroundColor: "blue" }
  };
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
                <b>Day 0 </b>
                <span style={styles.span}>( 14 February ) </span>
              </h3>
              <figure className="image">
                <img
                  className="is-2by1"
                  style={styles.image}
                  src="/images/day0.jpeg"
                />
              </figure>
            </div>
            <hr style={styles.hr} />
            <div className="column">
              <h3 className="title is-5">
                <strong>Day 1 </strong>
                <span style={styles.span}>( 15 February)</span>
                <br />
              </h3>
              <figure className="image " style={styles.image}>
                <img className="is-2by1" src="/images/day1.jpeg" />
              </figure>
            </div>
            <hr style={styles.hr} />
            <div className="column">
              <h3 className="title is-5">
                <strong>Day 2 </strong>
                <span style={styles.span}>( 16 February )</span>
                <br />
              </h3>
              <figure className="image " style={styles.image}>
                <img className="is-2by1" src="/images/day2.jpeg" />
              </figure>
            </div>
            <hr style={styles.hr} />
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Schedule;

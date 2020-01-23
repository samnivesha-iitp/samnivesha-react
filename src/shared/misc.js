import React from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";

const Misc = () => {
  return (
    <Layout>
      <Helmet>
        <title>Miscellaneous Links</title>
      </Helmet>
      <section className="hero is-fullheight is-light">
        <div className="hero-body" style={{ alignItems: "unset" }}>
          <div className="container">
            <h2 className="title is-4" style={{ paddingTop: "40px" }}>
              Miscellaneous Links
            </h2>
            <br />
            <div className="columns is-8 is-variable">
              <div className="column is-half">
                <h3 className="title is-5">Registration Steps:</h3>
                <br />
                <h3 className="subtitle">
                  Please GO through Registration steps before proceeding for
                  Registration.
                </h3>
                <a
                  href="https://docs.google.com/document/d/1wq3WS4sv67mdtRF-2mP8PP37cxEy5gcVP-CORD3GL-k/edit"
                  className="button is-primary is-outlined "
                  target="_blank"
                >
                  View steps
                </a>
              </div>
              <div className="column is-half">
                <h3 className="title is-5">Price guide Samnivesha’20</h3>
                <br />
                <h3 className="subtitle">
                  Please have a look at price details while doing payment.
                </h3>
                <a
                  href="https://docs.google.com/document/d/1ql3rcsSA6Gn8mq6ExFWHqYmRLXtTGtbAqOcftTf0tcY/edit?usp=sharing"
                  className="button is-success is-outlined"
                  target="_blank"
                >
                  Price Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Misc;

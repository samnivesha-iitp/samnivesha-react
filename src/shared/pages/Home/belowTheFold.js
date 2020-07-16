// external
import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
// component
import About from "../about";
const Workshop = loadable(() => import(/* webpackChunkName: "Home.Workshop" */ "../workshop"), {
  ssr: false,
});
const Events = loadable(() => import(/* webpackChunkName: "Home.Events" */ "../events"), {
  ssr: false,
});

const BelowTheFold = ({ workshop: workshopHandler, register: registerHandler, isLoading }) => {
  return (
    <>
      <About />
      <section className="section section-feature-grey is-fullheight" id="guestLecture">
        <div className="container">
          <div className="section-title-wrapper has-text-centered">
            <h2 className="section-title-landing">Guest Lecture</h2>
            <h4>
              Take away the motivation from esteemed lectures.
              <br />
            </h4>
          </div>

          <div className="content-wrapper">
            <div className="columns is-vcentered pb-40 pt-40">
              <div className="column is-4 is-offset-1">
                <img className="" src="/images/wguest1.webp" alt="" />
              </div>
              <div className="column is-6 is-offset-1">
                <div className="title quick-feature is-handwritten text-bold">
                  <div>Prof. Deepankar Choudhury</div>
                </div>
                <div className="title-divider is-small"></div>
                <span className="section-feature-description">
                  Prof. Deepankar Choudhury is Institute Chair Professor of Civil Engineering
                  department at Indian Institute of Technology (IIT) Bombay, Mumbai, India and
                  Adjunct Professor of Academy of Scientific and Innovative Research (AcSIR) of CSIR
                  laboratories (connected to CSIR-CBRI Roorkee) of India.
                  <br />
                  <br />
                  Prof. Choudhury is the only Geotechnical Engineer of India who is an elected
                  Fellow (FNASc) of the oldest Science Academy of India, viz. The National Academy
                  of Sciences, India.
                </span>
              </div>
            </div>
            <div className="columns is-vcentered pb-40 pt-40">
              <div className="column is-6 is-offset-1">
                <div className="title quick-feature is-handwritten text-bold">
                  <div>Er. Debasis Chakraborty</div>
                </div>
                <div className="title-divider is-small"></div>
                <span className="section-feature-description">
                  <br />
                  18 years Industrial Experience in Design & Engineering <br />
                  <br />
                  Presently associated with Tata Steel Ltd. Previously engaged with Tata Consulting
                  Engineers (TCE), Consulting Engineers Ltd. & L&T Ramboll Consulting Engineers Ltd.
                </span>
              </div>
              <div className="column is-4 is-offset-1">
                <img className="" src="/images/wguest3.webp" alt="" />
              </div>
            </div>
            <div className="columns is-vcentered pb-40 pt-40">
              <div className="column is-4 is-offset-1">
                <img className="" src="/images/wguest2.webp" alt="" />
              </div>
              <div className="column is-6 is-offset-1">
                <div className="title quick-feature is-handwritten text-bold">
                  <div>Er. Sanjib Kumar Das</div>
                </div>
                <div className="title-divider is-small"></div>
                <span className="section-feature-description">
                  <br />
                  15 years Industrial Experience in Design & Engineering
                  <br />
                  <br /> Presently associated with Tata Steel Ltd. Previously engaged with Tata
                  Consulting Engineers (TCE)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Workshop onClick={workshopHandler} isLoading={isLoading} />
      <Events onClick={registerHandler} isLoading={isLoading} />
    </>
  );
};
BelowTheFold.propTypes = {
  workshop: PropTypes.func,
  register: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default BelowTheFold;

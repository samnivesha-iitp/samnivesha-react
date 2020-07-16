// external
import React, { Component } from "react";
// components

class About extends Component {
  render() {
    return (
      <section className="section section-feature-grey is-fullheight" id="about">
        <div className="container">
          <div className="section-title-wrapper has-text-centered">
            <h2 className="section-title-landing">About Us</h2>
            <p className="is-2" style={{ fontSize: "19px" }}>
              Samnivesha is the annual technical fest of the Department of Civil and Environmental
              Engineering (DCEE) with a myriad of events revolving around the exciting areas of
              Civil and Environmental engineering. India needs better engineers for its
              infrastructural and economic growth. With this vision in our mind the DCEE annually
              conducts its very own technical fest to attract engineers from all over the country
              and provide them plethora of events to compete for and win exciting rewards.
              <br />
              <br /> Now ACE is back with another edition of Samnivesha.
              <br /> <br /> We envisage this edition of Samnivesha to be a grand success in not only
              Bihar but also the Eastern India. It will restore the glory of Bihar as the greatest
              centre of education for which it was once known for and ultimately serve the purpose
              of producing better engineers for a better tomorrow.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default About;

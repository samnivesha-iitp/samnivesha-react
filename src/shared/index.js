import React, { Component } from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";
import './css/events.css'

class Home extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Samnivesha | Home</title>
          <link rel="stylesheet" href="/css/index/pageloader.css" />
          <link rel="stylesheet" href="/css/index/core.css" />
        </Helmet>
        <Layout>
          <section className="hero is-fullheight is-light">
            <div className="hero-body  p-b-30 ">
              <div className="container">
                <h2 className="subtitle">
                  <span className="has-text-centered is-block" style={{paddingBottom:"20px"}}>
                    Association of Civil engineers of IIT Patna presents
                  </span>
                </h2>
                <h1 className="title">
                  <span className="is-size-1  has-text-centered is-block">
                    Samnivesha'20
                  </span>
                </h1>
                <div className="has-text-centered">
                  <img
                    className="m-t-50"
                    src="/images/property_image.png"
                    alt="Find rentals"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="section section-feature-grey is-fullheight" id="guestLecture">
            <div className="container">
              <div className="section-title-wrapper has-text-centered">
                <h2 className="section-title-landing">Guest Lecture</h2>
                <h4>Take away the motivation from esteemed lectures.</h4>
              </div>

              <div className="content-wrapper">
                <div className="columns is-vcentered pb-40 pt-40">
                  <div className="column is-6 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>Dr. Devdas Menon</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      Presently a Professor in the Department of Civil
                      Engineering at IIT Madras, engaged in teaching, research
                      and consultancy in structural engineering (with a focus on
                      the design of concrete structures).
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="http://www.devdasmenon.com/"
                        target="_blank"
                        className="button btn-align btn-more is-link color-primary"
                      >
                        Learn more <i className="sl sl-icon-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="column is-4 is-offset-1">
                    <img
                      className=""
                      src="/images/index/illustrations/drawings/teamwork.svg"
                      alt=""
                    />
                  </div>
                  <div className="column is-6 is-offset-1">
                    <img
                      className=""
                      src="/images/index/illustrations/drawings/teamwork.svg"
                      alt=""
                    />
                  </div>
                  <div className="column is-4 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>Dr. Devdas Menon</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      Presently a Professor in the Department of Civil
                      Engineering at IIT Madras, engaged in teaching, research
                      and consultancy in structural engineering (with a focus on
                      the design of concrete structures).
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="http://www.devdasmenon.com/"
                        target="_blank"
                        className="button btn-align btn-more is-link color-primary"
                      >
                        Learn more <i className="sl sl-icon-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="columns is-vcentered pb-40 pt-40">
                  <div className="column is-4 is-offset-1">
                    <img
                      className=""
                      src="/images/index/illustrations/drawings/teamwork.svg"
                      alt=""
                    />
                  </div>
                  <div className="column is-6 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>Dr. Devdas Menon</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      Presently a Professor in the Department of Civil
                      Engineering at IIT Madras, engaged in teaching, research
                      and consultancy in structural engineering (with a focus on
                      the design of concrete structures).
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="http://www.devdasmenon.com/"
                        target="_blank"
                        className="button btn-align btn-more is-link color-primary"
                      >
                        Learn more <i className="sl sl-icon-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-feature-grey is-fullheight" id="workshop">
            <div className="container">
              <div className="section-title-wrapper has-text-centered">
                <h2 className="section-title-landing">Workshop</h2>
                <h4>Ignite the spirit with interactive workshops</h4>
              </div>

              <div className="content-wrapper">
                <div className="columns is-vcentered pb-40 pt-40">
                  <div className="column is-4 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>STAAD.Pro</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      STAAD. Pro is one of the advanced tools used by the Civil
                      Engineers for structural analysis of the designs in the
                      construction and building industry.The industry expects
                      the candidates to be familiar with the latest skills and
                      techniques related to structural designing, but somehow
                      they fail to meet the industry standards.
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="https://www.bentley.com/en/products/product-line/structural-analysis-software/staadpro"
                        className="button btn-align btn-more is-link color-primary"
                        target="_blank"
                      >
                        Learn more <i className="sl sl-icon-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="column is-6 is-offset-1">
                    <img
                      className=""
                      src="/images/index/illustrations/drawings/teamwork.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section section-feature-grey is-medium" id="event">
            <div className="container">
              <div className="section-title-wrapper has-text-centered" style={{paddingBottom:"40px"}}>
                <h2 className="section-title-landing">Events</h2>
                <h4>
                  Showcase your technical brilliance at unparalleled multitude
                  of events.
                </h4>
              </div>

              <div className="content-wrapper">
                <div className="columns">
                  <div className="column is-4">
                    <div className="event-card is-wavy">
                      <div className="card-date">
                        <div className="date">
                          <span className="day">2</span>
                          <span className="month">Days</span>
                        </div>
                      </div>
                      <div className="img-container">
                        <img
                          src="/images/index/kit/event1.jpg"
                          alt=""
                          data-demo-src="/images/index/kit/event1.jpg"
                        />
                      </div>
                      <div className="card-text">
                        <div className="text text-container">
                          <div className="text text-header">
                            <h2 className="text text-title">Bridge</h2>
                            <p className="text text-subtitle">
                              Model Bridge Design
                            </p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              The objective of this event is to design,
                              construct and test the most efficient bridge built
                              in accordance with the specifications.
                            </p>
                            <a
                              href="#"
                              className="button btn-align btn-more is-link color-accent mt-10 mb-10"
                            >
                              Event details
                              <i className="sl sl-icon-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-4">
                    <div className="event-card is-wavy">
                      <div className="card-date">
                        <div className="date">
                          <span className="day">1</span>
                          <span className="month">Day</span>
                        </div>
                      </div>
                      <div className="img-container">
                        <img
                          src="/images/index/kit/event2.jpg"
                          alt=""
                          data-demo-src="/images/index/kit/event2.jpg"
                        />
                      </div>
                      <div className="card-text">
                        <div className="text text-container">
                          <div className="text text-header">
                            <h2 className="text text-title">Treasure hunt</h2>
                            <p className="text text-subtitle">Rush Event</p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              The event requires participation in team and it
                              involves reaching various checkpoints with help of
                              clues collected during your journey and completing
                              the tasks allotted.
                            </p>
                            <a
                              href="#"
                              className="button btn-align btn-more is-link color-accent mt-10 mb-10"
                            >
                              Event details
                              <i className="sl sl-icon-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-4">
                    <div className="event-card is-wavy">
                      <div className="card-date">
                        <div className="date">
                          <span className="day">2</span>
                          <span className="month">Hrs</span>
                        </div>
                      </div>
                      <div className="img-container">
                        <img
                          src="/images/index/kit/event3.svg"
                          alt=""
                          data-demo-src="/images/index/kit/event3.svg"
                        />
                      </div>
                      <div className="card-text">
                        <div className="text text-container">
                          <div className="text text-header">
                            <h2 className="text text-title">House Of Cards</h2>
                            <p className="text text-subtitle">Fun EVent</p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              Chance of showing your engineering skills with
                              cards and passion! So, get innovative and build
                              your own house with CARDS.
                            </p>
                            <a
                              href="#"
                              className="button btn-align btn-more is-link color-accent mt-10 mb-10"
                            >
                              Event details
                              <i className="sl sl-icon-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="backtotop" className="">
            <a href="#"></a>
          </div>
        </Layout>
      </>
    );
  }
}
export default Home;

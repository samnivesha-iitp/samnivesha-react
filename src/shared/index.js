import React, { Component } from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";

class Home extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Samnivesha | Home</title>
          <link rel="stylesheet" href="/css/index/pageloader.css"/>
          <link rel="stylesheet" href="/css/index/core.css"/>
        </Helmet>
        <Layout>
          <section className="hero is-fullheight is-light">
            <div className="hero-body  p-b-30 ">
              <div className="container">
                <h2 className="subtitle">
                  <span className="has-text-centered is-block">
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
          <section className="section section-feature-grey is-fullheight">
            <div className="container">
              <div className="section-title-wrapper has-text-centered">
                <h2 className="section-title-landing">Guest Lecture</h2>
                <h4>Take away the motivation from esteemed lectures.</h4>
              </div>

              <div className="content-wrapper">
                <div className="columns is-vcentered pb-40 pt-40">
                  <div className="column is-4 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>Powerful search</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu
                      harum inermis iudicabit. Ex vidit fierent hendrerit eum,
                      sed stet periculis ut.
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="#"
                        className="button btn-align btn-more is-link color-primary"
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

          <section className="section section-feature-grey is-fullheight">
            <div className="container">
              <div className="section-title-wrapper has-text-centered">
                <h2 className="section-title-landing">Workshop</h2>
                <h4>Ignite the spirit with interactive workshops</h4>
              </div>

              <div className="content-wrapper">
                <div className="columns is-vcentered pb-40 pt-40">
                  <div className="column is-4 is-offset-1">
                    <div className="title quick-feature is-handwritten text-bold">
                      <div>Powerful search</div>
                    </div>
                    <div className="title-divider is-small"></div>
                    <span className="section-feature-description">
                      Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu
                      harum inermis iudicabit. Ex vidit fierent hendrerit eum,
                      sed stet periculis ut.
                    </span>
                    <div className="pt-10 pb-10">
                      <a
                        href="#"
                        className="button btn-align btn-more is-link color-primary"
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
          <section className="section section-feature-grey is-medium">
            <div className="container">
              <div className="section-title-wrapper has-text-centered">
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
                          <span className="day">24</span>
                          <span className="month">Aug</span>
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
                            <h2 className="text text-title">Marbella</h2>
                            <p className="text text-subtitle">
                              Partners training session
                            </p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ea nulla cum impedit et nemo
                              molestiae, suscipit animi officiis soluta natus,
                              provident ab laudantium, amet dolorum.
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
                          <span className="day">19</span>
                          <span className="month">Sep</span>
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
                            <h2 className="text text-title">Prague</h2>
                            <p className="text text-subtitle">
                              Release momentum
                            </p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ea nulla cum impedit et nemo
                              molestiae, suscipit animi officiis soluta natus,
                              provident ab laudantium, amet dolorum.
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
                          <span className="day">05</span>
                          <span className="month">Dec</span>
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
                            <h2 className="text text-title">Chicago</h2>
                            <p className="text text-subtitle">Node JS Conf</p>
                          </div>
                          <div className="text text-details">
                            <p className="text text-description">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ea nulla cum impedit et nemo
                              molestiae, suscipit animi officiis soluta natus,
                              provident ab laudantium, amet dolorum.
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

import React, { useEffect, useState, useContext } from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";
import "./css/events.css";
import PropTypes from "prop-types";
import AuthContext from "./components/authContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
const arrayFinder = require("../../utils/findArray");
import axios from "axios";
const getUserData = require("../../utils/getUserData");

const Home = props => {
  // const { data } = props;
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    store
  } = useContext(AuthContext);
  const [evedata, setEveData] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setEveData(arrayFinder("eventData", store));
    window.addEventListener("scroll", scrollhandler);
    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  });
  const scrollhandler = () => {
    if (window.scrollY >= 100) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };
  const registerHandler = e => {
    e.preventDefault();
    // console.log(e.target.href);
    const id = e.target.href.match(/http:\/\/localhost:3000\/event\/(\d+)/);
    // console.log(id[1]);
    const eventId = id[1];
    if (!isAuthenticated) {
      props.history.push("/login");
    }
    const { events } = user;
    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id == eventId) {
          setMsg({ message: "Already Registered." });
          break;
        }
      }
    }
    for (let i = 0; i < evedata.length; i++) {
      if (evedata[i]._id == eventId) {
        const isgroupallowed = evedata[i].isgroupallowed;
        if (isgroupallowed) {
          props.history.push("/profile");
        } else {
          axios
            .post(`/${eventId}/${user._id}`)
            .then(res => {
              if (res.status == 200) {
                setMsg({ status: true, msg: "success" });
                getUserData(user._id)
                  .then(user => {
                    setUser(user);
                  })
                  .catch(() => {
                    setMsg({ message: "Error Detected." });
                  });
              }
            })
            .catch(() => {
              setMsg({ status: false, msg: "Failed" });
            });
        }
        break;
      }
    }
  };
  // const event2 = event.splice(0, 2);
  const backtotop = isAtTop ? "" : "visible";
  return (
    <>
      <Helmet>
        <title>Samnivesha | Home</title>
        <link rel="stylesheet" preload href="/css/index/core.css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <Layout>
        <section
          className="hero is-fullheight is-light"
          style={{ backgroundColor: "#edf5e1" }}
        >
          <div className="hero-body  p-b-30 ">
            <div className="container">
              <h2 className="subtitle">
                <span
                  className="has-text-centered is-block"
                  style={{ paddingBottom: "20px" }}
                >
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
        <section
          className="section section-feature-grey is-fullheight"
          id="about"
        >
          <div className="container">
            <div className="section-title-wrapper has-text-centered">
              <h2 className="section-title-landing">About Us</h2>
              <p className="is-1">Association of Civil Engineers</p>
              <p className="is-2">
                Samnivesha is the annual technical fest of the Department of
                Civil and Environmental Engineering (DCEE) with a myriad of
                events revolving around the exciting areas of Civil and
                Environmental engineering. India needs better engineers for its
                infrastructural and economic growth. With this vision in our
                mind the DCEE annually conducts its very own technical fest to
                attract engineers from all over the country and provide them
                plethora of events to compete for and win exciting rewards.
                <br />
                <br /> Now ACE is back with another edition of Samnivesha.
                <br /> <br /> We envisage this edition of Samnivesha to be a
                grand success in not only Bihar but also the Eastern India. It
                will restore the glory of Bihar as the greatest centre of
                education for which it was once known for and ultimately serve
                the purpose of producing better engineers for a better tomorrow.
              </p>
            </div>
          </div>
        </section>
        <section
          className="section section-feature-grey is-fullheight"
          id="guestLecture"
        >
          <div className="container">
            <div className="section-title-wrapper has-text-centered">
              <h2 className="section-title-landing">Guest Lecture</h2>
              <h4>
                Take away the motivation from esteemed lectures.
                <br />
                <strong>(Coming Soon ! )</strong>
              </h4>
            </div>

            {/* <div className="content-wrapper">
              <div className="columns is-vcentered pb-40 pt-40">
                <div className="column is-6 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>Dr. Devdas Menon</div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    Presently a Professor in the Department of Civil Engineering
                    at IIT Madras, engaged in teaching, research and consultancy
                    in structural engineering (with a focus on the design of
                    concrete structures).
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
                    src="/images/index/illustrations/drawings/teamwork.png"
                    alt=""
                  />
                </div>
                <div className="column is-6 is-offset-1">
                  <img
                    className=""
                    src="/images/index/illustrations/drawings/teamwork.png"
                    alt=""
                  />
                </div>
                <div className="column is-4 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>Dr. Devdas Menon</div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    Presently a Professor in the Department of Civil Engineering
                    at IIT Madras, engaged in teaching, research and consultancy
                    in structural engineering (with a focus on the design of
                    concrete structures).
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
                    src="/images/index/illustrations/drawings/teamwork.png"
                    alt=""
                  />
                </div>
                <div className="column is-6 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>Dr. Devdas Menon</div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    Presently a Professor in the Department of Civil Engineering
                    at IIT Madras, engaged in teaching, research and consultancy
                    in structural engineering (with a focus on the design of
                    concrete structures).
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
            </div> */}
          </div>
        </section>

        <section
          className="section section-feature-grey is-fullheight"
          id="workshop"
        >
          <div className="container">
            <div className="section-title-wrapper has-text-centered">
              <h2 className="section-title-landing">Workshop</h2>
              <h4>
                Ignite the spirit with interactive workshops
                <br />
                <strong>(Coming Soon !)</strong>
              </h4>
            </div>

            {/* <div className="content-wrapper">
              <div className="columns is-vcentered pb-40 pt-40">
                <div className="column is-4 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>STAAD.Pro</div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    STAAD. Pro is one of the advanced tools used by the Civil
                    Engineers for structural analysis of the designs in the
                    construction and building industry.The industry expects the
                    candidates to be familiar with the latest skills and
                    techniques related to structural designing, but somehow they
                    fail to meet the industry standards.
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
                    src="/images/index/illustrations/drawings/teamwork.png"
                    alt=""
                  />
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <section className="section section-feature-grey is-medium" id="event">
          <div className="container">
            <div
              className="section-title-wrapper has-text-centered"
              style={{ paddingBottom: "40px" }}
            >
              <h2 className="section-title-landing">Events</h2>
              <h4>
                Showcase your technical brilliance at unparalleled multitude of
                events.
              </h4>
            </div>

            <div className="content-wrapper">
              <div className="columns">
                <div className="column is-4">
                  <div className="event-card is-wavy">
                    <div className="img-container">
                      <img
                        src="/images/b.png"
                        alt=""
                        data-demo-src="/images/b.png"
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
                            The objective of this event is to design, construct
                            and test the most efficient bridge built in
                            accordance with the specifications.
                          </p>
                          <a
                            href="#"
                            className="button btn-align btn-more is-link color-accent mt-10 mb-10 "
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/123"
                            className="button btn-align btn-more is-link color-accent mt-10 mb-10 "
                          >
                            Register
                            <i className="sl sl-icon-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-4">
                  <div className="event-card is-wavy">
                    {/* <div className="card-date">
                      <div className="date">
                        <span className="day">1</span>
                        <span className="month">Day</span>
                      </div>
                    </div> */}
                    <div className="img-container">
                      <img
                        src="/images/g.png"
                        alt=""
                        data-demo-src="/images/g.png"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">Geo-manji</h2>
                          <p className="text text-subtitle">
                            Treasure Hunt Event
                          </p>
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
                    <div className="img-container">
                      <img
                        src="/images/h.png"
                        alt=""
                        data-demo-src="/images/h.png"
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
                            Chance of showing your engineering skills with cards
                            and passion! So, get innovative and build your own
                            house with CARDS.
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
              <div className="columns">
                <div className="column is-4">
                  <div className="event-card is-wavy">
                    {/* <div className="card-date">
                      <div className="date">
                        <span className="day">2</span>
                        <span className="month">Days</span>
                      </div>
                    </div> */}
                    <div className="img-container">
                      <img
                        src="/images/e.png"
                        alt=""
                        data-demo-src="/images/e.png"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">
                            Engineers Conclave
                          </h2>
                          <p className="text text-subtitle">
                            Present Your Research
                          </p>
                        </div>
                        <div className="text text-details">
                          <p className="text text-description">
                            The conclave will act as a platform for aspiring
                            engineers and researchers to present their research
                            prospects which will be reviewed.
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
                    {/* <div className="card-date">
                      <div className="date">
                        <span className="day">1</span>
                        <span className="month">Day</span>
                      </div>
                    </div> */}
                    <div className="img-container">
                      <img
                        src="/images/c.png"
                        alt=""
                        data-demo-src="/images/c.png"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">CiviQ</h2>
                          <p className="text text-subtitle">Quizzing Event</p>
                        </div>
                        <div className="text text-details">
                          <p className="text text-description">
                            CiviQ is a quizzing event which will provide you
                            with an opportunity to test your technical knowledge
                            and acumen of Civil Engineering.
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
                    {/* <div className="card-date">
                      <div className="date">
                        <span className="day">2</span>
                        <span className="month">Hrs</span>
                      </div>
                    </div> */}
                    <div className="img-container">
                      <img
                        src="/images/l.png"
                        alt=""
                        data-demo-src="/images/l.png"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">Lensart</h2>
                          <p className="text text-subtitle">Fun EVent</p>
                        </div>
                        <div className="text text-details">
                          <p className="text text-description">
                            Photography is a tool by which we can freeze the
                            time and have a look back in the past. ACE brings
                            you a chance of showing your photography skills!
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

        <div id="backtotop" className={`${backtotop}`}>
          <a href="#"></a>
        </div>
      </Layout>
    </>
  );
};
const Card = props => {
  const { eventName, tagline, description, poster, _id } = props.event;
  return (
    <div className="column is-4">
      <div className="event-card is-wavy">
        <div className="img-container">
          <img src={`${poster}`} alt="" data-demo-src={`${poster}`} />
        </div>
        <div className="card-text">
          <div className="text text-container">
            <div className="text text-header">
              <h2 className="text text-title">{eventName}</h2>
              <p className="text text-subtitle">{tagline}</p>
            </div>
            <div className="text text-details">
              <p className="text text-description">{description}</p>
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
  );
};

Home.propTypes = {
  data: PropTypes.array
};
export default withRouter(Home);

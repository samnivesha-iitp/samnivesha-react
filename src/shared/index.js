import React, { useEffect, useState, useContext } from "react";
import Layout from "./components/layout";
import { Helmet } from "react-helmet";
import "./css/events.css";
import PropTypes from "prop-types";
import { AuthContext } from "./components/authContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
const arrayFinder = require("../../utils/findArray");
import axios from "axios";
const getUserData = require("../../utils/getUserData");
import Notification from "./components/notification";

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
  const [msg, setMsg] = useState({ message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", scrollhandler);
    return () => {
      clearTimeout(removeMsg);
      window.removeEventListener("scroll", scrollhandler);
    };
  });
  useEffect(() => {
    setEveData(arrayFinder("eventData", store));
    const modalTimer = setTimeout(() => {
      setIsModal(true);
    }, 5000);
    return () => {
      clearTimeout(modalTimer);
    };
  }, []);
  const scrollhandler = () => {
    setScrollTop(window.scrollY);
    if (window.scrollY >= 100) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };
  const removeMsg = () => {
    setMsg({ message: "", status: "" });
  };
  const registerHandler = e => {
    e.preventDefault();
    const id = e.target.href.match(
      /https:\/\/samnivesha.iitp.ac.in\/event\/(\w+)/
    );
    const eventId = id[1];
    if (!isAuthenticated) {
      props.history.push("/login");
    } else {
      const { events } = user;
      let currEventUser = 0;
      // check if user has already registered
      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          if (events[i]._id == eventId) {
            setMsg({ message: "Already Registered." });
            currEventUser++;
            setTimeout(removeMsg, 3000);
            break;
          }
        }
      }
      if (currEventUser !== 1) {
        const { eventData } = evedata;
        for (let i = 0; i < eventData.length; i++) {
          if (eventData[i]._id == eventId) {
            const isgroupallowed = eventData[i].isgroupallowed;
            if (isgroupallowed) {
              props.history.push("/profile");
            } else {
              axios
                .post(`/event/${eventId}/${user._id}`)
                .then(res => {
                  if (res.status == 200) {
                    setMsg({ status: true, message: "You are registered." });
                    getUserData(user._id)
                      .then(user => {
                        setUser(user.userData);
                        setTimeout(removeMsg, 3000);
                      })
                      .catch(() => {
                        setMsg({ message: "Error Detected." });
                        setTimeout(removeMsg, 3000);
                      });
                  }
                })
                .catch(() => {
                  setMsg({ status: false, msg: "Failed" });
                  setTimeout(removeMsg, 3000);
                });
            }
            break;
          }
        }
      }
    }
  };
  const workshopHandler = async e => {
    e.preventDefault();
    const workshopregex = /https:\/\/samnivesha.iitp.ac.in\/add\/workshop\?name=(.*)/;
    const currworkshop = e.target.href.match(workshopregex)[1];
    if (!isAuthenticated) {
      props.history.push("/profile");
    } else {
      const { workshop } = user;
      if (workshop !== "") {
        setMsg({ message: "Already Registered." });
        setTimeout(removeMsg, 3000);
      } else {
        const response = await axios.post("/users/add/workshop", {
          userId: user._id,
          payload: currworkshop
        });
        if (response.status == 200) {
          setMsg({ status: true, message: "You are registered." });
          getUserData(user._id)
            .then(user => {
              setUser(user.userData);
              setTimeout(removeMsg, 3000);
            })
            .catch((err) => {
              console.log(err)
              setMsg({ message: "Error Detected." });
              setTimeout(removeMsg, 3000);
            });
        } else {
          setMsg({ status: false, msg: "Failed" });
          setTimeout(removeMsg, 3000);
        }
      }
    }
  };
  // const event2 = event.splice(0, 2);
  const backtotop = isAtTop ? "" : "visible";
  const status = msg.status
    ? "is-success"
    : msg.status !== ""
    ? "is-warning"
    : "is-hidden";
  const successMsg = msg.status ? msg.message : null;
  const errMsg = !msg.status ? msg.message : null;
  const loadingStatus = isLoading ? "is-loading" : "";
  const currentEventModalCSS = isModal ? "is-active" : null;
  return (
    <>
      <Helmet>
        <title>Samnivesha | Home</title>
        <link
          rel="preload"
          href="/css/index/core.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          {`<link rel="stylesheet" href="/css/index/core.css" />`}
        </noscript>
        <link
          rel="preload"
          href="/css/Main.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>{`<link rel="stylesheet" href="/css/Main.css" />`}</noscript>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <Layout>
        <section
          className="hero1 is-fullheight1 is-light"
          style={{ backgroundColor: "#edf5e1" }}
        >
          <div id="main">
            <div
              id="logo"
              style={{ transform: `translate(0px,-${scrollTop / 2}%)` }}
            >
              <img
                src="/images/small.webp"
                srcSet="/images/small.webp 1000w, /images/Mountain.png 1300w, "
                width="100%"
              />
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
              {/* <p className="is-1">Association of Civil Engineers</p> */}
              <p className="is-2" style={{ fontSize: "19px" }}>
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
                    src="/images/autocad.png"
                    alt=""
                  />
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
              <h4>Ignite the spirit with interactive workshops</h4>
            </div>
            <div className="content-wrapper">
              <div className="columns is-vcentered pb-40 pt-40">
                <div className="column is-6 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>
                      AutoCAD<sup>®</sup>
                    </div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    AutoCAD is computer-aided design (CAD) software that
                    architects, engineers and construction professionals rely on
                    to create precise 2D and 3D drawings. It helps us in
                    drafting and editing 2D geometry and 3D models with solids,
                    surfaces and mesh objects.The industry expects the
                    candidates to be familiar with the latest skills and
                    techniques related to any type of designing.
                  </span>
                  <div className="pt-10 pb-10">
                    <a
                      href="http://www.ndsworld.in/"
                      target="_blank"
                      className="button btn-align btn-more is-link color-primary"
                    >
                      Learn more <i className="sl sl-icon-arrow-right"></i>
                    </a>
                    <Link
                      onClick={workshopHandler}
                      to="/add/workshop?name=autocad"
                      className={`button btn-align btn-more is-link color-primary ${loadingStatus}`}
                    >
                      Register
                      <i className="sl sl-icon-arrow-right"></i>
                    </Link>
                  </div>
                </div>
                <div className="column is-4 is-offset-1">
                  <img className="" src="/images/autocad.png" alt="" />
                </div>
              </div>
              <div className="columns is-vcentered pb-40 pt-40">
                <div className="column is-4 is-offset-1">
                  <img className="" src="/images/sap.png" alt="" />
                </div>
                <div className="column is-6 is-offset-1">
                  <div className="title quick-feature is-handwritten text-bold">
                    <div>
                      SAP2000<sup>®</sup>
                    </div>
                  </div>
                  <div className="title-divider is-small"></div>
                  <span className="section-feature-description">
                    From its 3D object based graphical modeling environment to
                    the wide variety of analysis and design options completely
                    integrated across one powerful user interface, SAP2000 has
                    proven to be the most integrated, productive and practical
                    general purpose structural program on the market today.
                    Complex Models can be generated and meshed with powerful
                    built in templates. We'll keep you up with the pace of
                    industry standards and you will learn along the way how it's
                    easy to generate complex model in a very simple,easy and
                    intutive way with the help of SAP2000.
                  </span>
                  <div className="pt-10 pb-10">
                    <a
                      href="https://www.csiamerica.com/products/sap2000"
                      target="_blank"
                      className="button btn-align btn-more is-link color-primary"
                    >
                      Learn more <i className="sl sl-icon-arrow-right"></i>
                    </a>
                    <Link
                      onClick={workshopHandler}
                      to="/add/workshop?name=sap"
                      className={`button btn-align btn-more is-link color-primary ${loadingStatus}`}
                    >
                      Register
                      <i className="sl sl-icon-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
                        src="/images/b.webp"
                        alt=""
                        data-demo-src="/images/b.webp"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">Bridge it</h2>
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
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10`}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e18407e437ee11f063db0ca"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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
                        src="/images/g.webp"
                        alt=""
                        data-demo-src="/images/g.webp"
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
                            href="/pdf/g.pdf"
                            target="_blank"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 `}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e1840f4437ee11f063db0cb"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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
                    <div className="img-container">
                      <img
                        src="/images/h.webp"
                        alt=""
                        data-demo-src="/images/h.webp"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">House Of Cards</h2>
                          <p className="text text-subtitle">Fun Event</p>
                        </div>
                        <div className="text text-details">
                          <p className="text text-description">
                            Chance of showing your engineering skills with cards
                            and passion! So, get innovative and build your own
                            house with CARDS.
                          </p>
                          <a
                            href="/pdf/h.pdf"
                            target="_blank"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 `}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e18412e437ee11f063db0cc"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
                          >
                            Register
                            <i className="sl sl-icon-arrow-right"></i>
                          </Link>
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
                        src="/images/e.webp"
                        alt=""
                        data-demo-src="/images/e.webp"
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
                            href="/pdf/e.pdf"
                            target="_blank"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 `}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e184176437ee11f063db0cd"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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
                        src="/images/c.webp"
                        alt=""
                        data-demo-src="/images/c.webp"
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
                            href="/pdf/c.pdf"
                            target="_blank"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 `}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e1841ad437ee11f063db0ce"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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
                        <span className="day">2</span>
                        <span className="month">Hrs</span>
                      </div>
                    </div> */}
                    <div className="img-container">
                      <img
                        src="/images/l.webp"
                        alt=""
                        data-demo-src="/images/l.webp"
                      />
                    </div>
                    <div className="card-text">
                      <div className="text text-container">
                        <div className="text text-header">
                          <h2 className="text text-title">Lensart</h2>
                          <p className="text text-subtitle">Fun Event</p>
                        </div>
                        <div className="text text-details">
                          <p className="text text-description">
                            Photography is a tool by which we can freeze the
                            time and have a look back in the past. ACE brings
                            you a chance of showing your photography skills!
                          </p>
                          <a
                            href="/pdf/l.pdf"
                            target="_blank"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 `}
                          >
                            Event details
                            <i className="sl sl-icon-arrow-right"></i>
                          </a>
                          <Link
                            onClick={registerHandler}
                            to="/event/5e1841e2437ee11f063db0cf"
                            className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
                          >
                            Register
                            <i className="sl sl-icon-arrow-right"></i>
                          </Link>
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
      <div
        id="single-image-modal"
        className={`image-modal modal ${currentEventModalCSS}`}
      >
        <div className="modal-background scaleInCircle"></div>
        <div className="modal-content scaleIn">
          <div className="image-grid">
            <figure className="image is-4by3 cornered">
              <img
                src="/images/Lensart.webp"
                alt=""
                data-demo-src="/images/Lensart.webp"
              />
              <figcaption>
                <h2>Lensart</h2>
                <p>Current Going On Event</p>
                <a href="/pdf/l.pdf">View more</a>
              </figcaption>
            </figure>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => {
            setIsModal(false);
          }}
        ></button>
      </div>
      <Notification status={status} successMsg={successMsg} errorMsg={errMsg} />
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
                className={`button btn-align btn-more is-link color-accent mt-10 mb-10 ${loadingStatus}`}
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

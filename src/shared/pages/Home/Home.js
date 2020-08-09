// external Dependencies
import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import loadable from "@loadable/component";
import { useHistory } from "react-router-dom";

// Components
import Layout from "shared/components/layout";
import { AuthContext } from "shared/components/authContext";
import Notification from "shared/components/notification";
import { AboutFallback } from "./fallback";

const BelowTheFold = loadable(() => import(/* webpackChunkName: "Home.below" */ "./belowTheFold"), {
  ssr: false,
});
// css
import "shared/css/events.css";
// import "shared/css/notification-bar.css";
import "shared/scss/home.scss";
import "shared/css/Main.css";
// utilities
import { arrayFinder } from "utils/findArray";
import getUserData from "utils/getUserData";

const Home = () => {
  const history = useHistory();
  const { isAuthenticated, user, setUser, store } = useContext(AuthContext);
  const [evedata, setEveData] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);
  const [msg, setMsg] = useState({ message: "", type: "" });
  const [isLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  // const [notificationBar, setNotificationBar] = useState(false);
  useEffect(() => {
    const scrollhandler = () => {
      setScrollTop(window.scrollY);
      if (window.scrollY >= 100) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener("scroll", scrollhandler);
    setEveData(arrayFinder("eventData", store));

    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  }, []);

  useEffect(() => {
    if (msg.type !== "" && msg.message !== "") {
      const timer = setTimeout(() => {
        setMsg({ message: "", type: "" });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [msg]);
  const registerHandler = (e) => {
    e.preventDefault();
    const url = new URL(e.target.href);
    const eventId = url.pathname.match(/\/event\/(\w+)/)[1];
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      const { events } = user;
      let currEventUser = 0;
      // check if user has already registered
      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          if (events[i]._id == eventId) {
            setMsg({ type: "warning", message: "Already Registered." });
            currEventUser++;
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
              history.push("/profile");
            } else {
              axios
                .post(`/event/${eventId}/${user._id}`)
                .then((res) => {
                  if (res.status == 200) {
                    setMsg({ type: "success", message: "You are registered." });
                    getUserData(user._id)
                      .then((user) => {
                        setUser(user.userData);
                      })
                      .catch(() => {
                        setMsg({ type: "danger", message: "Error Ocurred." });
                      });
                  }
                })
                .catch(() => {
                  setMsg({ type: "danger", msg: "Failed" });
                });
            }
            break;
          }
        }
      }
    }
  };
  const workshopHandler = async (e) => {
    e.preventDefault();
    const workshopregex = /\/add\/workshop\?name=(.*)/;
    const url = new URL(e.target.href);
    const currworkshop = url.href.match(workshopregex)[1];
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      const { workshop } = user;
      if (workshop !== "") {
        setMsg({ type: "warning", message: "Already Registered." });
      } else {
        const response = await axios.post("/users/add/workshop", {
          userId: user._id,
          payload: currworkshop,
        });
        if (response.status == 200) {
          setMsg({ type: "success", message: "You are registered." });
          getUserData(user._id)
            .then((user) => {
              setUser(user.userData);
            })
            .catch((err) => {
              console.log(err);
              setMsg({ type: "danger", message: "Error Detected." });
            });
        } else {
          setMsg({ type: "danger", msg: "Failed" });
        }
      }
    }
  };
  const backtotop = isAtTop ? "" : "visible";

  const styles = {
    marquee: {
      position: "absolute",
      zIndex: 10000,
      bottom: "80px",
      fontSize: "20px",
      fontWeight: "bold",
      backgroundColor: "white",
    },
  };
  return (
    <>
      <Helmet>
        <title>Samnivesha | Home</title>
      </Helmet>
      <Layout>
        <script src="/fontawesome.min.js"></script>
        <marquee
          scrolldelay="200"
          behaviour="alternate"
          style={{ ...styles.marquee, display: "none" }}
        >
          <span>
            <p>
              <span style={{ color: "#008000" }}>
                Bus Schedule has been uploaded. &nbsp;
                <a href="/images/bus.jpg" target="_blank">
                  Check out here
                </a>
              </span>
              &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "#ff0000" }}>
                Registration has been closed. Further registration can be done at registration desk
                only.
              </span>
            </p>
          </span>
        </marquee>
        <section className="hero1 is-fullheight1 is-light">
          <div id="main">
            <div id="logo" style={{ transform: `translate(0px,-${scrollTop / 5}%)` }}>
              <img
                src="/images/small.webp"
                srcSet="/images/small.webp 1000w, /images/bg.webp 1300w, "
                width="100%"
              />
            </div>
          </div>
        </section>
        <BelowTheFold
          register={registerHandler}
          workshop={workshopHandler}
          isLoading={isLoading}
          fallback={<AboutFallback />}
        />

        <div id="backtotop" className={`${backtotop}`}>
          <a href="#"></a>
        </div>
      </Layout>
      <Notification type={msg.type} msg={msg.message} />
    </>
  );
};

export default Home;

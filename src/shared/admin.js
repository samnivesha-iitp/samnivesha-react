import React, { useState, useEffect, useContext } from "react";
import "./css/admin.css";
import Helmet from "react-helmet";
import Axios from "axios";
import Popupbar from "./components/popupbar";
import { AdminContext } from "./components/authContext";
import AuthAdmin from "../../utils/adminApi";

const admin = new AuthAdmin();
const Admin = props => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    Axios.get("/users")
      .then(response => {
        // console.log(response.data);
        const mockdata = response.data;
        mockdata.map(user => {
          user.fullName = user.firstName + " " + user.lastName;
          delete user.firstName;
          delete user.lastName;
          delete user.createdAt;
          delete user.updatedAt;
          delete user.resetPasswordExpires;
          delete user.resetPasswordToken;
          delete user.__v;
          delete user.email;
          if (user.events.length > 0) {
            user.event = "";
            for (let i = 0; i < user.events.length; i++) {
              user.event = user.event + user.events[i].eventName + ",";
            }
            delete user.events;
          } else {
            user.event = "";
            delete user.events;
          }
        });
        setData(mockdata);
      })
      .catch(() => {
        setOpen(true);
        setMsgType("error");
        setMsg("Data Retrieving Error");
      });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const isMobileCSS = isMobile ? "is-active" : null;
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="#">
              Samnivesha Admin
            </a>
            <div
              className={`navbar-burger burger ${isMobileCSS}`}
              data-target="navMenu"
              onClick={() => {
                isMobile ? setIsMobile(false) : setIsMobile(true);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className={`navbar-menu ${isMobileCSS}`}>
            <div className="navbar-start">
              <a className="navbar-item" href="#">
                Home
              </a>
              <a
                className="navbar-item"
                href="#"
                onClick={() => {
                  if (admin.logout()) {
                    setIsAdmin(false);
                    props.history.push("/admin/login");
                  }
                }}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a className="is-active">Dashboard</a>
                </li>
                <li>
                  <a className="">Add user</a>
                </li>
                <li>
                  <a className="">Remove user</a>
                </li>
                <li>
                  <a className="">Update user</a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column is-9">
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Hello, Admin.</h1>
                  <h2 className="subtitle">
                    I hope you are having a great day!
                  </h2>
                </div>
              </div>
            </section>
            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">{data !== "" && data.length}</p>
                    <p className="subtitle">Users</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">6</p>
                    <p className="subtitle">Events</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">3.4k</p>
                    <p className="subtitle">Groups</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <p className="title">19</p>
                    <p className="subtitle">Exceptions</p>
                  </article>
                </div>
              </div>
            </section>
            <div className="columns">
              <div className="column is-12">
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Events</th>
                      <th>ACE Id</th>
                      <th>Contact No.</th>
                      <th>College</th>
                      <th>Referral Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data !== "" &&
                      data.map((data, index) => {
                        return (
                          <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.fullName}</td>
                            <td>{data.event}</td>
                            <td>{data.username}</td>
                            <td>{data.mobileNumber}</td>
                            <td>{data.college}</td>
                            <td>{data.referralId}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popupbar
        autoHideDuration={6000}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        severity={msgType}
        message={msg}
        onClose={handleClose}
      />
    </>
  );
};

export default Admin;

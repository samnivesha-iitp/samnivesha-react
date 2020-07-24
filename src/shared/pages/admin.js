// external dependencies
import React, { useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { useRouteMatch, Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import Axios from "axios";

// component
import Popupbar from "../components/popupbar";
import { AdminContext } from "../components/authContext";
import Dashboard from "../components/admin/dashboard";
import AddUser from "../components/admin/adduser";
import RemoveUser from "../components/admin/removeuser";
import UpdateUser from "../components/admin/updateuser";
import PaymentStatus from "../components/admin/paymentstatus";
import Workshop from "../components/admin/workshop";
import GroupEvent from "../components/admin/grpevent";
import SoloEvent from "../components/admin/soloevent";
import Protected from "../components/admin/protected";
// utils
import AuthAdmin from "utils/adminApi";

// css
import "../css/admin.css";

//workers
import worker from "utils/webWoker";
const admin = new AuthAdmin();

const Admin = (props) => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const [hasPermissionToWrite, setHasPermissionToWrite] = useState(false);
  const [data, setData] = useState("");
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    Axios.get("/users")
      .then((response) => {
        // console.log(response.data);
        worker.onmessage = messageHandler;
        worker.postMessage({ data: response.data, name: "" });
      })
      .catch(() => {
        setOpen(true);
        setMsgType("error");
        setMsg("Data Retrieving Error");
      });
    return () => {
      worker.removeEventListener("message", messageHandler);
    };
  }, []);
  const messageHandler = ({ data }) => {
    setData(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let match = useRouteMatch();
  const isMobileCSS = isMobile ? "is-active" : null;
  const Links = [
    { name: "Dashboard", pathname: "/dashboard" },
    { name: "Add user", pathname: "/user/add" },
    { name: "Remove user", pathname: "/user/remove" },
    { name: "Update user", pathname: "/user/update" },
    { name: "Payment Status", pathname: "/paymentstatus" },
    { name: "Workshop", pathname: "/workshop" },
    { name: "Group Event", pathname: "/groupevent" },
    { name: "Solo Event", pathname: "/soloevent" },
  ];
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
                {Links.map((link) => {
                  return (
                    <li key={link.name}>
                      <NavLink to={`${match.url}/${link.pathname}`} activeClassName="is-active">
                        {link.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
          <div className="column is-9">
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Hello, Admin.</h1>
                  <h2 className="subtitle">I hope you are having a great day!</h2>
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
            <Switch>
              <Route
                path={`${match.path}/dashboard`}
                render={(routerProps) => {
                  return <Dashboard data={data} {...routerProps} />;
                }}
              />
              <Route
                path={`${match.path}/user/add`}
                render={() => {
                  return hasPermissionToWrite ? (
                    <AddUser dataHandle={setData} />
                  ) : (
                    <Protected
                      permission={setHasPermissionToWrite}
                      blocked={setBlocked}
                      blockstatus={blocked}
                    />
                  );
                }}
              />
              <Route
                path={`${match.path}/user/remove`}
                render={() => {
                  return hasPermissionToWrite ? (
                    <RemoveUser dataHandle={setData} />
                  ) : (
                    <Protected
                      permission={setHasPermissionToWrite}
                      blocked={setBlocked}
                      blockstatus={blocked}
                    />
                  );
                }}
              />
              <Route
                path={`${match.path}/user/update`}
                render={() => {
                  return hasPermissionToWrite ? (
                    <UpdateUser dataHandle={setData} />
                  ) : (
                    <Protected
                      permission={setHasPermissionToWrite}
                      blocked={setBlocked}
                      blockstatus={blocked}
                    />
                  );
                }}
              />
              <Route
                path={`${match.path}/paymentstatus`}
                render={() => {
                  return hasPermissionToWrite ? (
                    <PaymentStatus />
                  ) : (
                    <Protected
                      permission={setHasPermissionToWrite}
                      blocked={setBlocked}
                      blockstatus={blocked}
                    />
                  );
                }}
              />
              <Route path={`${match.path}/workshop`} component={Workshop} />
              <Route path={`${match.path}/groupevent`} component={GroupEvent} />
              <Route path={`${match.path}/soloevent`} component={SoloEvent} />
            </Switch>
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

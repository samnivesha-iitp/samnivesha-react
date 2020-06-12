import React, { useState, useEffect, useContext } from "react";
import "./css/admin.css";
import Helmet from "react-helmet";
import Axios from "axios";
import Popupbar from "./components/popupbar";
import { AdminContext } from "./components/authContext";
import AuthAdmin from "../../utils/adminApi";
import { useRouteMatch, Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import AddUser from "./components/admin/adduser";
import RemoveUser from "./components/admin/removeuser";
import UpdateUser from "./components/admin/updateuser";
import PaymentStatus from "./components/admin/paymentstatus";
import Workshop from "./components/admin/workshop";
import GroupEvent from "./components/admin/grpevent";
import SoloEvent from "./components/admin/soloevent";
import Protected from "./components/admin/protected";

//workers
import worker from "../../utils/webWoker";
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
                  <NavLink to={`${match.url}/dashboard`} activeClassName="is-active">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/user/add`} activeClassName="is-active">
                    Add User
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/user/remove`} activeClassName="is-active">
                    Remove User
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/user/update`} activeClassName="is-active">
                    Update User
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/paymentstatus`} activeClassName="is-active">
                    Payment Status
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/workshop`} activeClassName="is-active">
                    Workshop
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/groupevent`} activeClassName="is-active">
                    Group Event
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`${match.url}/soloevent`} activeClassName="is-active">
                    Solo Event
                  </NavLink>
                </li>
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
                render={(routerProps) => <Dashboard data={data} {...routerProps} />}
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

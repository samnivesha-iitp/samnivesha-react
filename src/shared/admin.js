import React, { useState, useEffect, useContext } from "react";
import "./css/admin.css";
import Helmet from "react-helmet";
import Axios from "axios";
import Popupbar from "./components/popupbar";
import { AdminContext } from "./components/authContext";
import AuthAdmin from "../../utils/adminApi";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import AddUser from "./components/admin/adduser";
import RemoveUser from "./components/admin/removeuser";
import UpdateUser from "./components/admin/updateuser";
import PaymentStatus from "./components/admin/paymentstatus";
import Workshop from "./components/admin/workshop";
import GroupEvent from "./components/admin/grpevent";
import SoloEvent from "./components/admin/soloevent";
import AdminDataApi from "../../utils/adminDataApi";

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
        const mockdata = AdminDataApi(response.data);
        setData(mockdata);
      })
      .catch(() => {
        setOpen(true);
        setMsgType("error");
        setMsg("Data Retrieving Error");
      });
  },[]);
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
                  <Link to={`${match.url}/dashboard`}>Dashboard</Link>
                </li>
                <li>
                  <Link to={`${match.url}/user/add`}>Add User</Link>
                </li>
                <li>
                  <Link to={`${match.url}/user/remove`}>Remove User</Link>
                </li>
                <li>
                  <Link to={`${match.url}/user/update`}>Update User</Link>
                </li>
                <li>
                  <Link to={`${match.url}/paymentstatus`}>Payment Status</Link>
                </li>
                <li>
                  <Link to={`${match.url}/workshop`}>Workshop</Link>
                </li><li>
                  <Link to={`${match.url}/groupevent`}>Group Event</Link>
                </li>
                <li>
                  <Link to={`${match.url}/soloevent`}>Solo Event</Link>
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
            <Switch>
              <Route path={`${match.path}/dashboard`}  render={()=><Dashboard data={data}/>}/>
              <Route path={`${match.path}/user/add`} render={()=><AddUser dataHandle={setData}/>}/>
              <Route path={`${match.path}/user/remove`} render={()=><RemoveUser dataHandle={setData}/>}/>
              <Route path={`${match.path}/user/update`} render={()=><UpdateUser dataHandle={setData}/>}/>
              <Route path={`${match.path}/paymentstatus`} component={PaymentStatus}/>
              <Route path={`${match.path}/workshop`} component={Workshop}/>
              <Route path={`${match.path}/groupevent`} component={GroupEvent}/>
              <Route path={`${match.path}/soloevent`} component={SoloEvent}/>
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

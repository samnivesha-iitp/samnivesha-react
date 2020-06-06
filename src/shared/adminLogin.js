import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { AdminContext } from "./components/authContext";
import Helmet from "react-helmet";
import Popupbar from "./components/popupbar";
import AuthAdmin from "../../utils/adminApi";

const AdminLogin = (props) => {
  const admin = new AuthAdmin();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    admin
      .login(email, password)
      .then((res) => {
        if (res) {
          setIsAdmin(true);
          props.history.push("/admin");
        } else {
          setMsgType("error");
          setMsg("Wrong guess");
          setOpen(true);
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title>Admin login</title>
      </Helmet>
      <main className="main">
        <section className="hero is-fullheight background-image">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-black">Login</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-black">Hint: Say My Name and I'll let you in</p>
                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <p className="control has-icons-left has-icons-right">
                        <input
                          className="input"
                          type="text"
                          placeholder="username"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control has-icons-left">
                        <input
                          className="input"
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          value={password}
                        />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className="button is-success">Login</button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Popupbar
        autoHideDuration={6000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        severity={msgType}
        message={msg}
        onClose={handleClose}
      />
    </>
  );
};
export default AdminLogin;

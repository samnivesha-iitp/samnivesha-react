import React, { useState, useEffect } from "react";
import Layout from "./components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./css/forgot.css";
const axios = require("axios");
import Notification from "./components/notification";

const Forgotpassword = props => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const removeMsg = () => {
    setErrorMsg("");
    setSuccessMsg("");
    clearTimeout(removeMsg);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    // setSuccessMsg('SuccessFully submitted.')
    axios
      .post("/forgot", { email })
      .then(res => {
        if (res.status == 200) {
          setSuccessMsg(res.data.message);
        }
        if (res.status == 404) {
          setErrorMsg(res.data.message);
        }
        setIsLoading(false);
        setEmail("");
        setTimeout(removeMsg, 5000);
      })
      .catch(err => {
        if (err) {
          setErrorMsg("An Error Occurred");
        }
        setIsLoading(false);
        setEmail("");
        setTimeout(removeMsg, 5000);
      });
  };
  const loadingStatus = isLoading ? "is-loading" : "";
  const status = successMsg
    ? "is-success"
    : errorMsg
    ? "is-danger"
    : "is-hidden";
  return (
    <Layout>
      <main className="main">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h4 className="title has-text-grey">Forgot Password</h4>
                <hr className="login-hr" />
                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <p className="control has-icons-left has-icons-right">
                        <input
                          className="input"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                        />
                        <span className="icon is-small is-left">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className={`button is-link ${loadingStatus}`}>
                          Send email
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Notification
        status={status}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />
    </Layout>
  );
};
export default Forgotpassword;

// external
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const axios = require("axios");

// component
import Layout from "../components/layout";
import Notification from "../components/notification";
// css
import "../css/forgot.css";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const removeMsg = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };
  useEffect(() => {
    return () => {
      clearTimeout(removeMsg);
    };
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setSuccessMsg('SuccessFully submitted.')
    axios
      .post("/forgot", { email })
      .then((res) => {
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
      .catch((err) => {
        if (err) {
          setErrorMsg("Invalid Email");
        }
        setIsLoading(false);
        setEmail("");
        setTimeout(removeMsg, 5000);
      });
  };
  const loadingStatus = isLoading ? "is-loading" : "";
  const status = successMsg ? "success" : errorMsg ? "warning" : "";
  return (
    <Layout>
      <main className="main">
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
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
                      <p className="control">
                        <button className={`button is-link ${loadingStatus}`}>Send email</button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Notification type={status} msg={successMsg || errorMsg} />
    </Layout>
  );
};
export default Forgotpassword;

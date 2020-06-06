import React, { useState, useEffect } from "react";
import Layout from "./components/layout";
import "./css/forgot.css";
const axios = require("axios");
import Notification from "./components/notification";
import { useParams, useHistory } from "react-router-dom";
import Helmet from "react-helmet";

const ResetPassword = (props) => {
  const { resetToken } = useParams();
  let history = useHistory();
  const [newPass, setNewPass] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [confPass, setConfPass] = useState("");
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
    if (newPass == confPass) {
      setIsLoading(true);
      axios
        .post(`/resetpassword?resetToken=${resetToken}`, { newPass: newPass })
        .then((res) => {
          setIsLoading(false);
          setNewPass("");
          setConfPass("");
          switch (res.status) {
            case 200:
              setSuccessMsg("Password has been Reset");
              break;
            case 401:
              setErrorMsg("Unauthorised or Invalid Token");
              break;
            case 500:
              setErrorMsg("Internal Server Error");
              break;
          }
          setTimeout(removeMsg, 2000);
        })
        .catch((err) => {
          setIsLoading(false);
          setNewPass("");
          setConfPass("");
          setErrorMsg("Error Occured.");
          setTimeout(removeMsg, 2000);
        });
    } else {
      setErrorMsg("Password Don't match");
    }
  };
  const loadingStatus = isLoading ? "is-loading" : "";
  const status = successMsg ? "is-success" : errorMsg ? "is-warning" : "is-hidden";
  const passwordcss = passwordLength >= 6 ? "is-success" : passwordLength == 0 ? "" : "is-danger";
  return (
    <Layout>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <main className="main">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h4 className="title has-text-grey">Reset Your Password</h4>
                <hr className="login-hr" />
                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <p className="control">
                        <input
                          className={`input ${passwordcss}`}
                          type="password"
                          placeholder=" New password"
                          name="newPassword"
                          value={newPass}
                          onChange={(e) => {
                            setNewPass(e.target.value);
                            setPasswordLength(e.target.value.length);
                          }}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <p className="control ">
                        <input
                          className={`input `}
                          type="password"
                          placeholder="Confirm password"
                          name="confPassword"
                          value={confPass}
                          onChange={(e) => {
                            setConfPass(e.target.value);
                          }}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className={`button is-link ${loadingStatus}`}>Submit</button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Notification status={status} successMsg={successMsg} errorMsg={errorMsg} />
    </Layout>
  );
};
export default ResetPassword;

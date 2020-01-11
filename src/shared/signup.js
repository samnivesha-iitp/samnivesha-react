import React, { Component } from "react";
import Layout from "./components/layout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExclamationTriangle,
  faUser,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { backgroundImage } from "../../archieve/collections";
import Helmet from "react-helmet";

const config = {
  environment: Boolean(process.env.NODE_ENV !== "production")
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: this.generateId(),
      email: "",
      password: "",
      college: "",
      isUserExists: null,
      isEmailExists: null,
      successMsg: "",
      errorMsg: "",
      innerWidth: "",
      mobileNumber: "",
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleCollege = this.handleCollege.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleMobileNumber = this.handleMobileNumber.bind(this);
  }
  generateId() {
    return "ACE" + Math.floor(Math.random() * 10000);
  }
  handleFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  handleLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
    axios.post("/users/findByEmail", { email: e.target.value }).then(res => {
      if (res.status == 200) {
        this.setState({ isEmailExists: res.data });
      }
    });
  }
  handleCollege(e) {
    this.setState({
      college: e.target.value
    });
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value,
      passwordClassName:
        e.target.value.length > 6 ? "input is-success" : "input is-danger"
    });
  }
  handleUsername() {
    axios
      .post("/users/findByUsername", { username: this.state.username })
      .then(res => {
        if (res.status == 200 && res.data == true) {
          this.setState({ username: this.generateId() });
        }
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("/users/add", this.state)
      .then(res => {
        if (res.status == 200) {
          this.setState({
            successMsg: `You have successfully registered. Your samnivesha Id is ${this.state.username}`,
            isLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({ errorMsg: "An error occured", isLoading: false }),
          console.log(err);
      });
  }
  componentDidMount() {
    this.setState({ innerWidth: window.innerWidth });
    this.handleUsername();
  }
  componentDidUpdate() {
    this.handleUsername();
  }
  handleMobileNumber(e) {
    this.setState({ mobileNumber: e.target.value });
  }
  render() {
    const Prefetch = config.environment ? "false" : "true";
    const loadingcss = this.state.isLoading ? "is-loading" : null;
    return (
      <Layout title="Signup Here">
        <Helmet>
          <title>Signup Here</title>
        </Helmet>
        <main className="main">
          <section
            className="hero is-fullheight background-image"
            style={{
              backgroundImage: `url(${backgroundImage[1]}&w=${this.state.innerWidth})`
            }}
          >
            <div className="hero-body" style={{ paddingTop: "75px" }}>
              <div className="container ">
                <div className="columns">
                  <div className="column is-4 is-offset-4">
                    <h3
                      className="title has-text-black"
                      style={{ textAlign: "center" }}
                    >
                      Signup
                    </h3>
                    <div className="box">
                      {this.state.successMsg && (
                        <div className="notification is-success is-padidngless">
                          <strong>{this.state.successMsg}</strong>
                        </div>
                      )}
                      {this.state.errorMsg && (
                        <div className="notification is-danger">
                          <button
                            className="delete"
                            onClick={() => this.setState({ errorMsg: "" })}
                          ></button>
                          <strong>{this.state.errorMsg}</strong>
                        </div>
                      )}

                      <form onSubmit={this.handleSubmit}>
                        <div className="field">
                          <label className="label">First Name</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="first name"
                              name="firstName"
                              required
                              onChange={this.handleFirstName}
                              value={this.state.firstName}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Last Name</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="last Name"
                              name="lastName"
                              onChange={this.handleLastName}
                              value={this.state.lastName}
                            />
                          </div>
                        </div>

                        <div className="field" style={{ display: "none" }}>
                          <div className="control has-icons-left has-icons-right">
                            <input
                              className="input"
                              type="hidden"
                              placeholder="Username"
                              value={this.state.username}
                              name="username"
                            />
                          </div>
                        </div>

                        <div className="field">
                          <label className="label">Email</label>
                          <div className="control has-icons-left has-icons-right">
                            <input
                              className={
                                this.state.isEmailExists
                                  ? "input is-danger"
                                  : this.state.isEmailExists == null
                                  ? "input"
                                  : "input is-success"
                              }
                              type="email"
                              placeholder="Email"
                              value={this.state.email}
                              name="email"
                              required
                              onChange={this.handleEmail}
                            />
                            <span className="icon is-small is-left">
                              <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <span className="icon is-small is-right">
                              {this.state.isEmailExists ? (
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                              ) : this.state.isEmailExists == null ? null : (
                                <FontAwesomeIcon icon={faCheck} />
                              )}
                            </span>
                          </div>
                          {this.state.isEmailExists ? (
                            <p className="help is-danger">
                              email is already registered
                            </p>
                          ) : (
                            <p className="help is-danger"></p>
                          )}
                        </div>
                        <div className="field">
                          <label className="label">College Name</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="College"
                              name="college"
                              required
                              value={this.state.college}
                              onChange={this.handleCollege}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Password</label>
                          <div className="control">
                            <input
                              className={
                                this.state.passwordClassName
                                  ? this.state.passwordClassName
                                  : "input"
                              }
                              type="password"
                              placeholder="Password"
                              name="password"
                              required
                              value={this.state.password}
                              onChange={this.handlePassword}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Mobile </label>
                          <div className="control">
                            <input
                              className="input"
                              type="number"
                              placeholder="Mobile Number"
                              name="mobileNumber"
                              required
                              value={this.state.mobileNumber}
                              onChange={this.handleMobileNumber}
                            />
                          </div>
                        </div>

                        <div className="field is-grouped">
                          <div className="control">
                            <button
                              className={`button is-link ${loadingcss}`}
                              disabled={
                                this.state.isUserExists ||
                                this.state.isEmailExists
                              }
                            >
                              Submit
                            </button>
                          </div>
                          <div className="control">
                            <Link
                              to="/login"
                              prefetch={Prefetch}
                              className="button is-primary is-light"
                            >
                              Login
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}
export default Signup;

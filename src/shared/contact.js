import React, { Component } from "react";
import Layout from "./components/layout";
import "./css/loader.css";
const axios = require("axios");
import Notification from "./components/notification";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      msg: "",
      errorMsg: "",
      successMsg: "",
      isloading: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleMsg = this.handleMsg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeMsg = this.removeMsg.bind(this)
  }
  removeMsg = () => {
    this.setState({ successMsg: null, errorMsg: null });
  };
  handleName(e) {
    this.setState({ name: e.target.value });
  }
  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleMsg(e) {
    this.setState({ msg: e.target.value });
  }
  componentWillUnmount(){
    clearTimeout(this.removeMsg);
  }
  handleSubmit() {
    const sendTo = "samniveshaiitp@gmail.com";
    const subject = `Contact Form submission by ${this.state.name}`;
    const body = `This is a response send to Samnivesha Node js server from ${this.state.name}
    Email: ${this.state.email}
    Message Body: ${this.state.msg} `;
    this.setState({ isloading: true });
    
    axios
      .post("/mail", { sendTo, subject, body })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            successMsg: "Successfully submitted",
            isloading: false,
            name: "",
            email: "",
            msg: ""
          });
          setTimeout(this.removeMsg, 5000);
        }
      })
      .catch(err => {
        this.setState({
          errorMsg: "An Error Occured.",
          name: "",
          email: "",
          msg: "",
          isloading: false
        });
        setTimeout(this.removeMsg, 5000);
      });
  }
  render() {
    const status = this.state.successMsg
      ? "is-success"
      : this.state.errorMsg
      ? "is-danger"
      : "is-hidden";
    const loadingStatus = this.state.isloading ? "is-loading" : "";
    return (
      <Layout title="Contact Page">
        <section className="hero is-fullheight is-light">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-8 is-variable ">
                <div className="column is-two-thirds has-text-left">
                  <h1 className="title is-1">Contact Us</h1>
                  <h2 className="title is-4">
                    <u>Reach to Us</u>
                  </h2>
                  <p className="is-size-5">
                    <b>Yash Rawal </b>
                    <span className="span  is-size-6">
                      : yash.ce17@iitp.ac.in - 9166062338
                    </span>
                  </p>

                  <p className="is-size-5">
                    <b>Rakesh Raushan </b>
                    <span className="span  is-size-6">
                      : rakesh.ce17@iitp.ac.in - 7261038443
                    </span>
                  </p>
                </div>
                <div className="column is-one-third has-text-left">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleName}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmail}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea
                        className="textarea is-medium"
                        value={this.state.msg}
                        onChange={this.handleMsg}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className={`button is-link is-fullwidth has-text-weight-medium is-medium ${loadingStatus}`}
                      onClick={this.handleSubmit}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Notification
          status={status}
          successMsg={this.state.successMsg}
          errorMsg={this.state.errorMsg}
        />
      </Layout>
    );
  }
}
export default Contact;

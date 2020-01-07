import React, { Component } from "react";
import Layout from "./components/layout";
require("isomorphic-fetch");
import Tag from "./components/tag";
import AuthContext from "./components/authContext";
import "./css/profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "",
      college: "",
      email: "",
      isModal: false,
      currPass: "",
      newPass: "",
      confPass: "",
      groupLeader: "",
      groupMembers: [],
      currentMember: "",
      eventRegistered: "",
      radioChecked: true,
      currentSelectedEvent: ""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleCurrPass = this.handleCurrPass.bind(this);
    this.handleNewPass = this.handleNewPass.bind(this);
    this.handleConfPass = this.handleConfPass.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleGroupMembers = this.handleGroupMembers.bind(this);
    this.addGroupMembers = this.addGroupMembers.bind(this);
    this.removeGroupMembers = this.removeGroupMembers.bind(this);
    this.selectedEventHandler = this.selectedEventHandler.bind(this);
  }
  componentDidMount() {
    const {
      username,
      firstName,
      lastName,
      college,
      email,
      events
    } = this.context.user;
    this.setState({
      username,
      fullName: firstName + " " + lastName,
      college,
      email,
      groupLeader: username,
      eventRegistered: events
    });
    // console.log("window", window.__APP_USER_PROFILE__);
  }
  showModal() {
    this.setState({ isModal: true });
  }
  hideModal() {
    this.setState({ isModal: false });
  }
  handleCurrPass(e) {
    this.setState({ currPass: e.target.value });
  }
  handleNewPass(e) {
    this.setState({ newPass: e.target.value });
  }

  handleConfPass(e) {
    this.setState({ confPass: e.target.value });
  }
  handleChangePassword(e) {
    e.preventDefault;
  }
  handleGroupMembers(curr, prev) {
    const newMember = [...prev, curr];
    this.setState({ groupMembers: newMember });
    this.setState({ currentMember: "" });
  }
  addGroupMembers(e) {
    this.setState({ currentMember: e.target.value });
  }
  removeGroupMembers(member) {
    const newMember = this.state.groupMembers.filter(mem => {
      return mem !== member;
    });
    this.setState({ groupMembers: newMember });
  }
  selectedEventHandler(e) {
    this.setState({ currentSelectedEvent: e.target.value });
  }
  static contextType = AuthContext;
  render() {
    const modalClass = this.state.isModal ? "is-active" : null;
    return (
      <Layout>
        <main className="main">
          <section className="hero is-medium">
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column">
                    <h1 className="title is-4">Hi, {this.state.fullName}</h1>
                    <h2 className="title is-5">
                      ACE Id : {this.state.username}
                    </h2>
                    <h2 className="title is-5">
                      College : {this.state.college}
                    </h2>
                    <h2 className="title is-5">Email: {this.state.email}</h2>
                    <button className="button is-info" onClick={this.showModal}>
                      Change Password
                    </button>
                    <h1
                      className="title is-5 has-text-centered "
                      style={{ paddingTop: "45px" }}
                    >
                      <u>Enrolled In</u>
                    </h1>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Event Name</th>
                          <th>Date</th>
                          <th>Place</th>
                          <th>Contact No.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.eventRegistered !== ""
                          ? this.state.eventRegistered.map((event, index) => {
                              if (event.place == null) {
                                event.place == "Tutorial Block";
                              }
                              if (event.timing == null) {
                                event.timing == "NA";
                              }
                              if (event.contact == null) {
                                event.contact == "NA";
                              }
                              return (
                                <tr key={event._id}>
                                  <th>{index + 1}</th>
                                  <th>{event.eventName}</th>
                                  <th>{event.timing}</th>
                                  <th>{event.place}</th>
                                  <th>{event.contact}</th>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                  <div className="column">
                    <div className="box">
                      <form method="post">
                        <h3 className="title  is-4 has-text-black has-text-centered">
                          Group Registration
                        </h3>

                        <div className="field is-horizontal">
                          <div
                            className="field-label is-normal"
                            style={{ textAlign: "left" }}
                          >
                            <label className="label">Event</label>
                          </div>
                          <div className="field-body">
                            <div className="field ">
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    onChange={this.selectedEventHandler}
                                    value={this.state.currentSelectedEvent}
                                  >
                                    <option value="event1">event1</option>
                                    <option value="event2">event2</option>
                                    <option value="event3">event3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-label"></div>
                          <div className="field-body">
                            <div className="field is-grouped is-grouped-multiline">
                              {this.state.groupMembers.map(member => {
                                return (
                                  <Tag
                                    key={member}
                                    member={member}
                                    remove={this.removeGroupMembers}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div
                            className="field-label is-normal visible"
                            style={{ textAlign: "left" }}
                          >
                            <label className="label">ACE id</label>
                          </div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control is-expanded">
                                <input
                                  className="input"
                                  type="text"
                                  value={this.state.currentMember}
                                  onChange={this.addGroupMembers}
                                  required
                                />
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <a
                                  className="button is-info"
                                  onClick={() => {
                                    this.handleGroupMembers(
                                      this.state.currentMember,
                                      this.state.groupMembers
                                    );
                                  }}
                                >
                                  Add
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <label
                            className="label"
                            style={{ paddingRight: "20px" }}
                          >
                            Are you group leader?
                          </label>

                          <div className="field-body">
                            <div className="field">
                              <div className="control ">
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="answer"
                                    checked={this.state.radioChecked}
                                    onChange={() => {
                                      this.setState({ radioChecked: true });
                                    }}
                                  />
                                  Yes
                                </label>
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="answer"
                                    value="no"
                                    onClick={() => {
                                      this.setState({ radioChecked: false });
                                    }}
                                  />
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="field is-horizontal">
                          <div className="field-label"></div>
                          <div className="field-body">
                            <div className="field">
                              <div className="control ">
                                <button
                                  className="button is-link"
                                  disabled={!this.state.radioChecked}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
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
        <div className={`modal ${modalClass}`}>
          <div className="modal-background"></div>
          <div className="modal-content" style={{ maxHeight: "unset" }}>
            <div className="box">
              <form
                action=""
                method="post"
                onSubmit={this.handleChangePassword}
              >
                <div className="field">
                  <div className="control">
                    <label className="label">current password</label>
                    <input
                      type="password"
                      className="input"
                      value={this.state.currPass}
                      onChange={this.handleCurrPass}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">New password</label>
                    <input
                      type="password"
                      className="input"
                      value={this.state.newPass}
                      onChange={this.handleNewPass}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Confirm password</label>
                    <input
                      type="password"
                      className="input"
                      value={this.state.confPass}
                      onChange={this.handleConfPass}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-info">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button
            className="modal-close is-large"
            area-label="close"
            onClick={this.hideModal}
          ></button>
        </div>
      </Layout>
    );
  }
}
export default Profile;

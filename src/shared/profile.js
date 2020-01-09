import React, { Component } from "react";
import Layout from "./components/layout";
require("isomorphic-fetch");
import Tag from "./components/tag";
import AuthContext from "./components/authContext";
import "./css/profile.css";
const arrayFinder = require("../../utils/findArray");
import axios from "axios";
import Notification from "./components/notification";
const getUserData = require("../../utils/getUserData");
import Helmet from "react-helmet";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "",
      college: "",
      email: "",
      isModal: false,
      newPass: "",
      confPass: "",
      groupLeader: "",
      groupMembers: [],
      currentMember: "",
      eventRegistered: "",
      radioChecked: true,
      currentSelectedEvent: "",
      groupEventsToRegister: [],
      eventData: [],
      successMsg: "",
      errorMsg: "",
      maxMembers: 1,
      addbuttonloading: false,
      submitbuttonloading: false,
      passresetbuttonloading: false,
      _id: "",
      passLength: 0
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleNewPass = this.handleNewPass.bind(this);
    this.handleConfPass = this.handleConfPass.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleGroupMembers = this.handleGroupMembers.bind(this);
    this.addGroupMembers = this.addGroupMembers.bind(this);
    this.removeGroupMembers = this.removeGroupMembers.bind(this);
    this.selectedEventHandler = this.selectedEventHandler.bind(this);
    this.findEventFromId = this.findEventFromId.bind(this);
    this.removeMsg = this.removeMsg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const filterGroupEvent = eventArray => {
      return eventArray.filter(event => {
        if (event.isgroupallowed) {
          return event;
        }
      });
    };
    const groupEventId = eventArr => {
      return eventArr.map(eve => {
        return eve._id;
      });
    };
    const grpEveIdToRegister = (totalEve, userHadRegistered) => {
      return totalEve.filter(eve => {
        if (userHadRegistered.indexOf(eve) !== -1) {
          return null;
        } else {
          return eve;
        }
      });
    };

    const { user, setUser, store } = this.context;
    const { username, firstName, lastName, college, email, events, _id } = user;
    const { eventData } = arrayFinder("eventData", store);
    const event = groupEventId(filterGroupEvent(eventData));
    const userEvent = groupEventId(filterGroupEvent(events));
    this.setState({
      username,
      fullName: firstName + " " + lastName,
      college,
      email,
      groupLeader: _id,
      eventRegistered: events,
      eventData: eventData,
      _id,
      groupEventsToRegister: grpEveIdToRegister(event, userEvent)
    });
  }
  showModal() {
    this.setState({ isModal: true });
  }
  hideModal() {
    this.setState({ isModal: false });
  }
  handleNewPass(e) {
    this.setState({
      newPass: e.target.value,
      passLength: e.target.value.length
    });
  }

  handleConfPass(e) {
    this.setState({ confPass: e.target.value });
  }
  handleChangePassword(e) {
    e.preventDefault();
    const { newPass, confPass, _id } = this.state;
    if (newPass == confPass) {
      this.setState({ passresetbuttonloading: true });
      axios
        .post(`/resetpassword/wt/${_id}`, { newPass: newPass })
        .then(res => {
          switch (res.status) {
            case 200:
              this.setState({ successMsg: "Password has been reset." });
            case 500:
              this.setState({ errorMsg: "Internal server Error" });
            case 503:
              this.setState({ errorMsg: "Database Error" });
          }
          setTimeout(this.removeMsg, 2000);
          this.setState({
            newPass: "",
            confPass: "",
            passresetbuttonloading: false,
            isModal:false
          });
        })
        .catch(() => {
          this.setState({ errorMsg: "Error Occured." });
          setTimeout(this.removeMsg, 2000);
          this.setState({
            newPass: "",
            confPass: "",
            passresetbuttonloading: false,
          });
        });
    } else {
      this.setState({
        errorMsg: "Password Don't match",
        passresetbuttonloading: false
      });
      setTimeout(this.removeMsg, 2000);
    }
  }
  removeMsg() {
    this.setState({ errorMsg: "", successMsg: "" });
  }
  handleGroupMembers(curr, prev) {
    // check if maximum number of member exist
    if (this.state.groupMembers.length <= this.state.maxMembers) {
      this.setState({ addbuttonloading: true });
      axios
        .post(
          `/users/validateuserforevent/${this.state.currentSelectedEvent}`,
          {
            username: curr
          }
        )
        .then(res => {
          if (res.data.message == false) {
            this.setState({
              addbuttonloading: false,
              errorMsg: "Already Registered.",
              currentMember: ""
            });
            setTimeout(this.removeMsg, 1500);
          }
          if (res.data.message == "not_exist") {
            this.setState({
              addbuttonloading: false,
              errorMsg: "Invalid Id.",
              currentMember: ""
            });
            setTimeout(this.removeMsg, 1500);
          }
          if (res.data.message == true) {
            const newMember = [...prev, curr];
            this.setState({
              addbuttonloading: false,
              groupMembers: newMember,
              currentMember: ""
            });
          }
        })
        .catch(() => {
          this.setState({
            addbuttonloading: false,
            errorMsg: "Internal Server Error",
            currentMember: ""
          });
          setTimeout(this.removeMsg, 1500);
        });
    } else {
      this.setState({ errorMsg: "Maximum Members Reached." });
      setTimeout(this.removeMsg, 1500);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.removeMsg);
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
    const event = this.findEventFromId(e.target.value)[0];
    this.setState({ maxMembers: event.maxMembersAllowed });
  }
  findEventFromId = eventId => {
    return this.state.eventData.filter(eve => {
      if (eve._id == eventId) {
        return eve;
      }
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const { groupLeader, groupMembers, currentSelectedEvent } = this.state;
    this.setState({ submitbuttonloading: true });
    axios
      .post(`/event/${currentSelectedEvent}/group/add`, {
        groupleader: groupLeader,
        groupmembers: groupMembers
      })
      .then(res => {
        if (res.status == 500) {
          this.setState({
            submitbuttonloading: false,
            errorMsg: res.data.message,
            groupmembers: []
          });
          setTimeout(this.removeMsg, 3000);
        }
        if (res.status == 200) {
          this.setState({
            submitbuttonloading: false,
            successMsg: " Group Registered.",
            groupmembers: []
          });
          getUserData(this.state._id)
            .then(res => {
              console.log(res.userData);
              this.context.setUser(res.userData);
            })
            .catch(err => {
              console.log("Error while updating State", err);
            });
          setTimeout(this.removeMsg, 3000);
        }
      })

      .catch(err => {
        this.setState({
          submitbuttonloading: false,
          errorMsg: "Internal Error",
          groupmembers: []
        });
        setTimeout(this.removeMsg, 3000);
      });
  }
  static contextType = AuthContext;

  render() {
    const modalClass = this.state.isModal ? "is-active" : null;
    const status = this.state.successMsg
      ? "is-success"
      : this.state.errorMsg
      ? "is-warning"
      : "is-hidden";
    const addButtonCSS = this.state.addbuttonloading ? "is-loading" : null;
    const submitButtonCSS = this.state.submitbuttonloading
      ? "is-loading"
      : null;
    const passresetcss = this.state.passresetbuttonloading
      ? "is-loading"
      : null;
      const disablebtn = this.state.passLength >= 6?false:true;
    return (
      <Layout>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>
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
                  <div className="column" id="groupregister">
                    <div className="box">
                      <form method="post" onSubmit={this.handleSubmit}>
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
                                    required
                                  >
                                    {this.state.groupEventsToRegister.map(
                                      eve => {
                                        return (
                                          <option value={eve} key={eve}>
                                            {
                                              this.findEventFromId(eve)[0]
                                                .eventName
                                            }
                                          </option>
                                        );
                                      }
                                    )}
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
                                />
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <a
                                  className={`button is-info ${addButtonCSS}`}
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
                                  className={`button is-link ${submitButtonCSS}`}
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
              <form onSubmit={this.handleChangePassword}>
                {/* <div className="field">
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
                </div> */}
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
                    <button className={`button is-info ${passresetcss}`} disabled={disablebtn}>
                      Submit
                    </button>
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
        <Notification
          successMsg={this.state.successMsg}
          errorMsg={this.state.errorMsg}
          status={status}
        />
      </Layout>
    );
  }
}
export default Profile;

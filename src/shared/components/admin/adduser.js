import React, { useState } from "react";
import Axios from "axios";
import Popupbar from "../popupbar";
import worker from "../../../../utils/webWoker";

const AddUser = ({ dataHandle }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [mobile, setMobile] = useState("");
  const [open, setOpen] = useState(false);
  const [referralId, setReferralId] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const submitFormHandle = async (e) => {
    e.preventDefault();
    const response = await Axios.post("/admin/user/add", {
      firstName,
      lastName,
      college,
      username,
      mobileNumber: mobile,
    });
    if (response.status === 200 && response.data === true) {
      setMsg("user added");
      setMsgType("success");
      setInitialState();
      const user = await Axios.get("/users");
      worker.onmessage = workerMessageHandler;
      worker.postMessage({ data: user.data, name: "" });
      setOpen(true);
    } else {
      setMsg("Failed");
      setMsgType("error");
      setInitialState();
      setOpen(true);
    }
  };
  const setInitialState = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setCollege("");
    setMobile("");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const workerMessageHandler = ({ data }) => {
    dataHandle(data);
  };
  return (
    <>
      <div className="columns">
        <div className="column is-12">
          <div className="box">
            <form onSubmit={submitFormHandle}>
              <h3 className="is-3 title has-text-centered">Register Form</h3>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        value={firstName}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        value={lastName}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field ">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="UserName"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        value={username}
                      />
                    </div>
                  </div>
                  <div className="field ">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="college"
                        onChange={(e) => {
                          setCollege(e.target.value);
                        }}
                        value={college}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        placeholder="mobile Number"
                        onChange={(e) => {
                          setMobile(e.target.value);
                        }}
                        value={mobile}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field ">
                <div className="control">
                  <button className="button is-link">Submit</button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Popupbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
        severity={msgType}
        message={msg}
      />
    </>
  );
};
export default AddUser;

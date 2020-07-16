import React, { useState } from "react";
import SearchUser from "./searchuser";
import Axios from "axios";
import Popupbar from "../popupbar";
import worker from "utils/webWoker";

const UpdateUser = ({ dataHandle }) => {
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, firstName, lastName, workshop } = data;
    const response = await Axios.post(`/users/${_id}/update`, {
      firstName,
      lastName,
      workshop,
    });
    if (response.status === 200 && response.data === true) {
      setMsgType("success");
      setData("");
      const user = await Axios.get("/users");
      worker.onmessage = workerHandler;
      worker.postMessage({ data: user.data, name: "" });
      setMsg("User Updated.");
      setOpen(true);
    } else {
      setMsg("Failed");
      setMsgType("error");
      setOpen(true);
    }
  };
  const workerHandler = ({ data }) => {
    dataHandle(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFirstName = (e) => {
    let { firstName, ...rest } = data;
    firstName = e.target.value;
    const newData = { firstName, ...rest };
    setData(newData);
  };
  const handleLastName = (e) => {
    let { lastName, ...rest } = data;
    lastName = e.target.value;
    const newData = { lastName, ...rest };
    setData(newData);
  };
  const handleWorkshop = (e) => {
    let { workshop, ...rest } = data;
    workshop = e.target.value;
    const newData = { workshop, ...rest };
    setData(newData);
  };
  return (
    <>
      <div className="columns">
        <div className="column is-12">
          <SearchUser userHandle={setData} />
          {data !== "" && (
            <form onSubmit={handleSubmit} style={{ paddingTop: "40px" }}>
              <input type="hidden" value={data._id} />
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={data.firstName}
                    onChange={handleFirstName}
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={data.lastName}
                    onChange={handleLastName}
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">workshop</label>
                <div className="control">
                  <input
                    type="text"
                    value={data.workshop}
                    onChange={handleWorkshop}
                    className="input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-info">Submit</button>
                </div>
              </div>
            </form>
          )}
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
export default UpdateUser;

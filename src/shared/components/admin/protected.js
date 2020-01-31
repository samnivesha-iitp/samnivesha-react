import React, { useState } from "react";

const Protected = ({ permission, blocked, blockstatus }) => {
  const [secret, setSecret] = useState("");
  const passHandler = e => {
    setSecret(e.target.value);
    if (e.target.value === "whitesnow") {
      permission(true);
    }
  };
  const submitHandler = () => {
    blocked(true);
  };
  return (
    <div className="columns">
      <div className="column is-12">
        {!blockstatus && (
          <div className="field has-addons">
            <div className="control">
              <input
                type="password"
                className="input"
                placeholder="Type  secret here"
                onChange={passHandler}
                value={secret}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        )}
        {blockstatus && (
          <div
            className=" title is-5 has-text-white"
            style={{ backgroundColor: "#ff0000" }}
          >
            You are not authorised to view this section.
          </div>
        )}
      </div>
    </div>
  );
};
export default Protected;

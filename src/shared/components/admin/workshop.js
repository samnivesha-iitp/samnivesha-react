import React, { useState } from "react";
import Button from "./button";

const Workshop = () => {
  const [data, setData] = useState("");
  return (
    <div className="columns">
      <div className="column is-12">
        <div className="buttons">
          <Button name="autocad" color="is-primary" clickHandle={setData} />
          <Button name="sap" color="is-link" clickHandle={setData} />
        </div>
        {data !== "" && (
          <table
            className="table is-fullwidth is-striped"
            style={{ paddingTop: "40px" }}
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Events</th>
                <th>ACE Id</th>
                <th>Contact No.</th>
                <th>College</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.event}</td>
                    <td>{user.username}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.college}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Workshop;

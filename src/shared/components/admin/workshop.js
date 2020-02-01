import React, { useState, useRef } from "react";
import Button from "./button";
import ReactToPrint from "react-to-print";

const Workshop = () => {
  const [data, setData] = useState("");
  const printRef = useRef(null);
  return (
    <div className="columns">
      <div className="column is-12">
        <div className="buttons is-centered">
          <Button name="autocad" color="is-primary" clickHandle={setData} />
          <Button name="sap" color="is-link" clickHandle={setData} />
          <ReactToPrint
            trigger={() => <button className="button is-warning">Print</button>}
            content={() => printRef.current}
          />
        </div>
        {data !== "" && (
          <table
            className="table is-fullwidth is-striped"
            style={{ paddingTop: "40px" }}
            ref={printRef}
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
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

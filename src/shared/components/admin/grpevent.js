import React, { useState, useRef } from "react";
import Button from "./grpEventButton";
import ReactToPrint from "react-to-print";

const GroupEvent = () => {
  const [data, setData] = useState("");
  const printRef = useRef(null);

  return (
    <div className="columns">
      <div className="column is-12">
        <div className="buttons is-centered">
          <Button
            name="Bridge it"
            id="5e18407e437ee11f063db0ca"
            color="is-primary"
            clickHandle={setData}
          />
          <Button
            name="Geo-manji"
            id="5e1840f4437ee11f063db0cb"
            color="is-link"
            clickHandle={setData}
          />
          <Button
            name="House Of Cards"
            id="5e18412e437ee11f063db0cc"
            color="is-info"
            clickHandle={setData}
          />
          <Button
            name="CiviQ"
            id="5e1841ad437ee11f063db0ce"
            color="is-success"
            clickHandle={setData}
          />
          <ReactToPrint
            trigger={() => <button className="button is-warning">Print</button>}
            content={() => printRef.current}
          />
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
                  <th>Group Member</th>
                  <th>ACE Id</th>
                  <th>Contact No.</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.fullName}</td>
                      <td>{user.groups}</td>
                      <td>{user.username}</td>
                      <td>{user.contact}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default GroupEvent;

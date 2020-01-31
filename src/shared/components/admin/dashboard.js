import React, { useState, useEffect } from "react";
import Loading from "../loading";

const Dashboard = ({ data }) => {
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);
  return firstRender ? (
    Loading
  ) : (
    <div className="columns">
      <div className="column is-12">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Events</th>
              <th>ACE Id</th>
              <th>Contact No.</th>
              <th>College</th>
              <th>Referral Id</th>
            </tr>
          </thead>
          <tbody>
            {data !== "" &&
              data.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.fullName}</td>
                    <td>{data.event}</td>
                    <td>{data.username}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.college}</td>
                    <td>{data.referralId}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;

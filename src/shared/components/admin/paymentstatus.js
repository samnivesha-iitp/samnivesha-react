import React, { useState } from "react";
import SearchUser from "./searchuser";
import Axios from "axios";
import Popupbar from "../popupbar";

const PaymentStatus = () => {
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const selectHandler = async e => {
    let { haspaid, ...rest } = data;
    haspaid = e.target.value;
    const newData = { haspaid, ...rest };
    const userId = newData._id;
    setData(newData);
    const response = await Axios.post("/admin/user/update/payment", {
      userId,
      haspaid
    });
    if (response.data === true && response.status === 200) {
      setMsg("Updated.");
      setMsgType("success");
      setOpen(true);
      setData("");
    } else {
      setMsg("Failed.");
      setMsgType("error");
      setOpen(true);
    }
  };
  return (
    <>
      <div className="columns">
        <div className="column is-12">
          <SearchUser userHandle={setData} />
          {data !== "" && (
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ACE Id</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr key={data._id}>
                    <td>
                      {data.firstName} {data.lastName}
                    </td>
                    <td>{data.username}</td>
                    <td>
                      <select
                        onChange={selectHandler}
                        value={data.haspaid}
                        className="select"
                      >
                        <option value={true}>Paid</option>
                        <option value={false}>Unpaid</option>
                      </select>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
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
export default PaymentStatus;

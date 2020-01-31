import React, { useState } from "react";
import SearchUser from "./searchuser";
import Popupbar from "../popupbar";
import Axios from "axios";
import AdminDataApi from "../../../../utils/adminDataApi";


const RemoveUser = ({ dataHandle }) => {
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  async function deleteUser(username) {
    const response = await Axios.delete(`/admin/user/${username}/delete`);
    if (response.data === true && response.status === 200) {
      setMsgType("success");
      setData("");
      const user = await Axios.get("/users");
      const mockdata = AdminDataApi(user.data);
      dataHandle(mockdata);
      setMsg("User Deleted.");
      setOpen(true);
    } else {
      setMsg("Failed");
      setMsgType("error");
      setOpen(true);
    }
  }
  return (
    <>
      <div className="columns">
        <div className="column is-12">
          <SearchUser userHandle={setData} />
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>ACE Id</th>
                <th>College</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data !== "" && (
                <tr key={data._id}>
                  <td>
                    {data.firstName} {data.lastName}
                  </td>
                  <td>{data.username}</td>
                  <td>{data.college}</td>
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => {
                        deleteUser(data.username);
                      }}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
export default RemoveUser;

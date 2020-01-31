import React, { useState, useEffect } from "react";
import Axios from "axios";

const SearchUser = ({ userHandle }) => {
  const [username, setUsername] = useState("");

  async function fetchData(aceId) {
    const response = await Axios.post("/users/findByUsername", {
      username: aceId
    });
    // set the user details obtained from db
    if (response.status === 200 && response.data === true) {
      // get user data
      const user = await Axios.get(`/admin/user/find?username=${aceId}`);
      userHandle(user.data);
    } else {
    }
  }
  const handleUsername = e => {
    setUsername(e.target.value);
    fetchData(e.target.value);
  };
  return (
    <div className="field">
      <div className="control">
        <input
          type="text"
          value={username}
          className="input"
          placeholder="Type ACE ID here"
          onChange={handleUsername}
        />
      </div>
    </div>
  );
};
export default SearchUser;

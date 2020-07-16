import React from "react";
import Axios from "axios";
import worker from "utils/webWoker";

const Button = ({ id, name, color, clickHandle }) => {
  const handleClick = async () => {
    const response = await Axios.get("/users");
    if (response.status === 200) {
      worker.onmessage = messageHandler;
      worker.postMessage({ data: response.data, name: "soloEvent", id });
    }
  };
  const messageHandler = ({ data }) => {
    clickHandle(data);
  };
  return (
    <button className={`button ${color} is-capitalized`} onClick={handleClick}>
      {name}
    </button>
  );
};
export default Button;

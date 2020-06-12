import React from "react";
import Axios from "axios";
import worker from "../../../../utils/webWoker";

const Button = ({ id, name, color, clickHandle }) => {
  const handleClick = async () => {
    const response = await Axios.get(`/event/${id}/group`);
    if (response.status === 200 && response.data !== false) {
      worker.onmessage = messageHandler;
      worker.postMessage({ data: response.data, name: "grpEvent" });
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

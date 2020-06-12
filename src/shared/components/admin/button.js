import React from "react";
import Axios from "axios";
import worker from "../../../../utils/webWoker";

const Button = ({ name, color, clickHandle }) => {
  const handleClick = async () => {
    const response = await Axios.post(`/admin/workshop?workshop=${name}`);
    if (response.status === 200 && response.data !== false) {
      worker.onmessage = workerMessageHandler;
      worker.postMessage({ data: response.data, name: "" });
    }
  };
  const workerMessageHandler = ({ data }) => {
    clickHandle(data);
  };
  return (
    <button className={`button ${color} is-capitalized`} onClick={handleClick}>
      {name}
    </button>
  );
};
export default Button;

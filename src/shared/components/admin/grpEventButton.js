import React from "react";
import Axios from "axios";
import { FilterGroupEvent } from "../../../../utils/adminDataApi";

const Button = ({ id, name, color, clickHandle }) => {
  const handleClick = async e => {
    const response = await Axios.get(`/event/${id}/group`);
    if (response.status === 200 && response.data !== false) {
      const mockeData = FilterGroupEvent(response.data);
      clickHandle(mockeData);
    }
  };
  return (
    <button className={`button ${color} is-capitalized`} onClick={handleClick}>
      {name}
    </button>
  );
};
export default Button;

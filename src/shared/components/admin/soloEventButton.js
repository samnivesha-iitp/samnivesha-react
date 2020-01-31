import React from "react";
import Axios from "axios";
import { FilterSoloEvent } from "../../../../utils/adminDataApi";

const Button = ({ id, name, color, clickHandle }) => {
  const handleClick = async e => {
    const response = await Axios.get("/users");
    if (response.status === 200) {

        const mockeData = FilterSoloEvent(response.data, id);
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

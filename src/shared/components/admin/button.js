import React from "react";
import Axios from "axios";
import AdminDataApi from "../../../../utils/adminDataApi";

const Button = ({ name, color, clickHandle }) => {
  const handleClick = async e => {
    const response = await Axios.post(`/admin/workshop?workshop=${name}`);
    if (response.status === 200 && response.data !== false) {
        const mockData = AdminDataApi(response.data)
      clickHandle(mockData);
    }
  };
  return (
    <button className={`button ${color} is-capitalized`} onClick={handleClick}>
      {name}
    </button>
  );
};
export default Button;

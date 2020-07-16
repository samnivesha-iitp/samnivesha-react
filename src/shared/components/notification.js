import React from "react";
import PropTypes from "prop-types";
// css
import "../css/notification.css";

const Notification = ({ type, msg }) => {
  return (
    type !== "" &&
    type !== "undefined" && (
      <>
        <article className={`message  is-${type} `}>
          <div className="message-header">
            <p>{msg}</p>
          </div>
        </article>
      </>
    )
  );
};
Notification.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string,
};
export default Notification;

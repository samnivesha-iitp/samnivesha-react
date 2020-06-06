import React from "react";
import "../css/notification.css";
const Notification = (props) => {
  return (
    <>
      <article className={`message  ${props.status} `}>
        <div className="message-header">
          <p>{props.successMsg || props.errorMsg}</p>
        </div>
      </article>
    </>
  );
};
export default Notification;

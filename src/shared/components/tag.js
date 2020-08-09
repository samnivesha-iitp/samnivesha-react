import React from "react";

const Tag = (props) => {
  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag is-danger">{props.member}</span>
        <a
          className="tag  is-delete"
          onClick={() => {
            props.remove(props.member);
          }}
        >
        </a>
      </div>
    </div>
  );
};
export default Tag;

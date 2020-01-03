import React from "react";

const Tag = props => {
  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag">{props.member}</span>
        <a
          className="tag  is-danger"
          onClick={() => {
            props.remove(props.member);
          }}
        >
          X
        </a>
      </div>
    </div>
  );
};
export default Tag;

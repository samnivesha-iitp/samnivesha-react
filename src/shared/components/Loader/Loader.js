import React from "react";
import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";

export const Paragraph = (props) => {
  return (
    <ContentLoader viewBox="0 0 476 370" uniqueKey={props.uniqueKey}>
      <rect x="0" y="100" width="400" height="6" rx="3" />
      <rect x="0" y="120" width="370" height="6" rx="3" />
      <rect x="0" y="140" width="300" height="6" rx="3" />
      <rect x="0" y="160" width="450" height="6" rx="3" />
      <rect x="0" y="210" width="250" height="6" rx="3" />
      <rect x="0" y="230" width="300" height="6" rx="3" />
      <rect x="0" y="250" width="400" height="6" rx="3" />
      <rect x="0" y="270" width="280" height="6" rx="3" />
    </ContentLoader>
  );
};
Paragraph.propTypes = {
  uniqueKey: PropTypes.string,
};

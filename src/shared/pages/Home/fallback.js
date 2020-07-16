import React from "react";
import ContentLoader from "react-content-loader";

export const AboutFallback = () => {
  return (
    <section className="section is-fullheight section-feature-grey">
      <div className="container">
        <ContentLoader viewBox="0 0 380 70" uniqueKey="about-loader">
          <rect x="0" y="0" width="70" height="70" rx="5" ry="5" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      </div>
    </section>
  );
};

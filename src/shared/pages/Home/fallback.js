import React from "react";

// component
import { Paragraph } from "../../components/Loader/Loader";

export const AboutFallback = () => {
  return (
    <section className="section is-fullheight section-feature-grey">
      <div className="container">
        <div className="columns" style={{ justifyContent: "center" }}>
          <div className="column" style={{ maxWidth: "768px" }}>
            <Paragraph uniqueKey="about" />
          </div>
        </div>
      </div>
    </section>
  );
};

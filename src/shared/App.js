import React from "react";
import Layout from "./components/layout";
export default function App() {
  return (
    <Layout>
      <div className="hero-body  p-b-30 ">
        <div className="container">
          <h2 className="subtitle">
            <span className="has-text-centered is-block">
              Association of Civil engineers of IIT Patna presents
            </span>
          </h2>
          <h1 className="title">
            <span className="is-size-1  has-text-centered is-block">
              Samnivesha'20
            </span>
          </h1>
          <div className="has-text-centered">
            <img
              className="m-t-50"
              src="images/property_image.png"
              alt="Find rentals"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// external
import React from "react";
import Helmet from "react-helmet";
// component
import Layout from "../components/layout";

const Sponsors = () => {
  return (
    <>
      <Helmet>
        <title>Sponsors</title>
      </Helmet>
      <Layout>
        <section className="hero is-fullheight is-relative login-hero signup-hero ">
          <div className="hero-body" style={{ alignItems: "unset" }}>
            <div className="container">
              <h2 className="title is-4 has-text-centered" style={{ paddingTop: "70px" }}>
                Our Sponsors
              </h2>
              <div className="columns ">
                <div className="column ">
                  <h3 className="title is-5">Associate Sponsors:</h3>
                  <br />
                  <div className="columns">
                    <div className="column is-3">
                      <figure className="image is-256x256">
                        <img src="/images/bsbccl.png" />
                      </figure>
                    </div>
                    <div className="column is-3">
                      <figure className="image is-256x256">
                        <img src="/images/buildco.png" />
                      </figure>
                    </div>
                    <div className="column is-3">
                      <figure className="image is-256x256">
                        <img src="/images/ptani.png" />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-3">
                  <h3 className="title is-5">Strategic Sponsor:</h3>
                  <br />
                  <figure className="image is-256x256">
                    <img src="/images/ruban.png" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <style>{`.login-hero{justify-content:center;top:0;left:0;width:100%;height:100%;overflow:hidden;}.circles li{position:absolute;display:block;list-style:none;width:20px;height:20px;background:rgba(0,255,255,0.6);animation:animate 25s linear infinite;bottom:-150px}.circles li:nth-child(1){left:25%;width:80px;height:80px;animation-delay:0s}.circles li:nth-child(2){left:10%;width:20px;height:20px;animation-delay:2s;animation-duration:12s}.circles li:nth-child(3){left:70%;width:20px;height:20px;animation-delay:4s}.circles li:nth-child(4){left:40%;width:60px;height:60px;animation-delay:0s;animation-duration:18s}.circles li:nth-child(5){left:65%;width:20px;height:20px;animation-delay:0s}.circles li:nth-child(6){left:75%;width:110px;height:110px;animation-delay:3s}.circles li:nth-child(7){left:35%;width:150px;height:150px;animation-delay:7s}.circles li:nth-child(8){left:50%;width:25px;height:25px;animation-delay:15s;animation-duration:45s}.circles li:nth-child(9){left:20%;width:15px;height:15px;animation-delay:2s;animation-duration:35s}.circles li:nth-child(10){left:85%;width:150px;height:150px;animation-delay:0s;animation-duration:11s}@keyframes animate{0%{transform:translateY(0) rotate(0);opacity:1;border-radius:0}100%{transform:translateY(-1000px) rotate(720deg);opacity:0;border-radius:50%}}.login-subtitle{color:$muted-grey!important;padding:20px 15%!important}`}</style>
    </>
  );
};
export default Sponsors;

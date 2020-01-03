import React, { Component } from "react";
import Layout from "./components/layout";
import {Helmet} from 'react-helmet'

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {};
  render() {
    return (
      <>
        <Helmet>
          <link rel="preload"   href="/css/bootstrap.min.css" as="style" type="text/css"></link>
          <link rel="stylesheet"   href="/css/bootstrap.min.css"  type="text/css"></link>
        </Helmet>
        <Layout title="About Us">
          <div className="bg-light">
            <div className="container py-5">
              <div className="row h-100 align-items-center py-5">
                <div className="col-lg-6">
                  <h1 className="display-4">About us</h1>
                  <p className="lead text-muted mb-0">
                    Association of Civil Engineers
                  </p>
                  <p className="lead text-muted" id="1">
                    Samnivesha is the annual technical fest of the Department of
                    Civil and Environmental Engineering (DCEE) with a myriad of
                    events revolving around the exciting areas of Civil and
                    Environmental engineering. India needs better engineers for
                    its infrastructural and economic growth. With this vision in
                    our mind the DCEE annually conducts its very own technical
                    fest to attract engineers from all over the country and
                    provide them plethora of events to compete for and win
                    exciting rewards.
                    <br />
                    <br /> The technical extravaganza is conducted by the
                    Association of Civil Engineers (ACE), the official
                    departmental Club of DCEE. Samnivesha will be a pioneer, a
                    fest first of its kind in Bihar, a fest completely based on
                    Civil Engineering! This festival forms a forum of similar
                    minds encouraging them to engage technically and develop
                    skills in civil applications. Samnivesha includes various
                    events, right from developing plans, testing minds on
                    knowledge and application in the constructionWorld!
                    <br /> <br /> The first edition of Samnivesha was a huge
                    success, comprising of exciting events, workshops and guest
                    lectures. The whole idea behind the fest is to provide
                    exposure to various industrial and research topics in Civil
                    engineering. Students from colleges across Bihar
                    participated with great zeal and enthusiasm. The total
                    footfall is estimated to be around 2000! Prof Devdas Menon
                    (IIT Madras) gave a very informative guest lecture. Several
                    events like Richter 9.0 related to earthquake resistibility,
                    BluePrint to showcase your designing skills, CiviQ to test
                    your knowledge in this field, House of cards attracted huge
                    participation from various colleges of Bihar. A workshop on
                    STAAD PRO, software widely used in structural engineering
                    was also conducted by none other than Bentley itself.
                    <br />
                    <br /> Now ACE is back with another edition of Samnivesha.
                    <br /> <br /> We envisage this edition of Samniveshato be a
                    grand success in not only Bihar but also the Eastern India.
                    It will restore the glory of Bihar as the greatest centre of
                    education for which it was once known for and ultimately
                    serve the purpose of producing better engineers for a better
                    tomorrow.
                  </p>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-5">
            <div className="container py-5">
              {/* <div className="row align-items-center mb-5">
              <div className="col-lg-6 order-2 order-lg-1">
                <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                <h2 className="font-weight-light">
                  Lorem ipsum dolor sit amet
                </h2>
                <p className="font-italic text-muted mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="btn btn-light px-5 rounded-pill shadow-sm">
                  Learn More
                </button>
              </div>
              <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg"
                  alt=""
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div>
            </div> */}
              {/* <div className="row align-items-center"> */}
              {/* <div className="col-lg-5 px-5 mx-auto">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg"
                  alt=""
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div> */}
              {/* <div className="col-lg-6">
                <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                <h2 className="font-weight-light">
                  Lorem ipsum dolor sit amet
                </h2>
                <p className="font-italic text-muted mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a
                  href="#"
                  className="btn btn-light px-5 rounded-pill shadow-sm"
                >
                  Learn More
                </a>
              </div> */}
              {/* </div> */}
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export default About;

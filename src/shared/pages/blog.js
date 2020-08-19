// external
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
// component
import Layout from "../components/layout";
// css
import blog from "../css/blog.module.css";

const Blog = () => {
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);
  return (
    <Layout title="Blog Page">
      <Helmet>
        <title>Samnivesha&apos;20</title>
      </Helmet>
      {!firstRender && (
        <section className="container" style={{ paddingTop: "40px" }}>
          <div className={`${blog["intro"]} column is-10 is-offset-1`}>
            <h2 className="title">Some Glimpses From Last Year</h2>
            <br />
            <p className="subtitle">
              The first edition of Samnivesha was a huge success, comprising of exciting events,
              workshops and guest lectures. Students from colleges across Bihar participated with
              great zeal and enthusiasm. Prof Devdas Menon (IIT Madras) gave a very informative
              guest lecture. Several events like Richter 9.0 related to earthquake resistibility,
              BluePrint to showcase your designing skills, CiviQ to test your knowledge in this
              field, House of cards attracted huge participation from various colleges of Bihar. A
              workshop on STAAD PRO, software widely used in structural engineering was also
              conducted by none other than Bentley itself.
            </p>
          </div>
          <div className={blog["sandbox"]}>
            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <img src="/images/1.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/2.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <div className="content">
                    <p>
                      Samnivesha 2019 kicked off with our esteemed Director Dr. Pushpak Bhattacharya
                      and our Chief Guest , Dr. Devdas Menon leading the proceedings. What followed,
                      was a two day spectacle that astounded everyone with the variety of events,
                      workshops and lectures.
                    </p>
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-8">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child mnotification is-white">
                      <img src="/images/3.png" alt="Italian Trulli" />
                    </article>
                    <article className="tile is-child mnotification is-white">
                      <img src="/images/4.png" alt="Italian Trulli" />
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification is-white">
                      <p className="title">Engineers Conclave</p>
                      <p className="subtitle">---------------</p>
                      <figure className="image is-4by3" style={{ paddingTop: "75%" }}>
                        <img src="/images/5.png" alt="Italian Trulli" />
                      </figure>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent is-shady">
                  <img src="/images/6.png" alt="Italian Trulli" />
                </div>
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/7.png" alt="Italian Trulli" />
              </div>
            </div>

            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <img src="/images/8.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/9.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/10.png" alt="Italian Trulli" />
              </div>
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <img src="/images/11.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/12.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/13.png" alt="Italian Trulli" />
              </div>
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <div className="content">
                    <p>
                      And thus, the incredibly successful maiden event of Samnivesha concluded.
                      Congratulations to all the winners and participants, and our deepest gratuity
                      for our sponsors without whom this would not have been possible. We are
                      certainly looking forward to bringing back Samnivesha with even more grandeur
                      in the coming years.
                    </p>
                  </div>
                </article>
              </div>
              <div className="tile is-parent is-8 is-shady">
                <img src="/images/15.png" alt="Italian Trulli" />
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};
export default Blog;

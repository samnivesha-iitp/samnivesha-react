import React, { useState, useEffect } from "react";
import Layout from "./components/layout";
import Helmet from "react-helmet";

const Blog = () => {
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);
  return (
    <Layout title="Blog Page">
      <Helmet>
        <title>Samnivesha'20</title>
        <link rel="stylesheet" preload href="/css/hero.css" />
      </Helmet>
      {!firstRender && (
        <section className="container" style={{ paddingTop: "40px" }}>
          <div className="intro column is-10 is-offset-1">
            <h2 className="title">Some Glimpses From Last Year</h2>
            <br />
            <p className="subtitle">
              The first edition of Samnivesha was a huge success, comprising of
              exciting events, workshops and guest lectures. Students from
              colleges across Bihar participated with great zeal and enthusiasm.
              Prof Devdas Menon (IIT Madras) gave a very informative guest
              lecture. Several events like Richter 9.0 related to earthquake
              resistibility, BluePrint to showcase your designing skills, CiviQ
              to test your knowledge in this field, House of cards attracted
              huge participation from various colleges of Bihar. A workshop on
              STAAD PRO, software widely used in structural engineering was also
              conducted by none other than Bentley itself.
            </p>
          </div>
          <div className="sandbox">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-shady">
                <img src="/images/1.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <img src="/images/2.png" alt="Italian Trulli" />
              </div>
              <div className="tile is-parent is-shady">
                <article className="tile is-child notification is-white">
                  <p className="title">Third column</p>
                  <p className="subtitle">With some content</p>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin ornare magna eros, eu pellentesque tortor vestibulum
                      ut. Maecenas non massa sem. Etiam finibus odio quis
                      feugiat facilisis.
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
                      <figure className="image is-4by3">
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
                  <p className="title">Third column</p>
                  <p className="subtitle">With some content</p>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin ornare magna eros, eu pellentesque tortor vestibulum
                      ut. Maecenas non massa sem. Etiam finibus odio quis
                      feugiat facilisis.
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

// external dependencies
import React, { Component } from "react";
import Helmet from "react-helmet";

// component
import Layout from "../components/layout";
import { backgroundImage } from "../../../archieve/collections";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: "",
    };
  }
  componentDidMount() {
    this.setState({ innerWidth: window.innerWidth });
  }
  render() {
    const styles = {
      columns: {
        backgroundColor: "#ffff",
        border: "2px solid red",
      },
    };
    return (
      <Layout title="Signup Here">
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <main className="main">
          <section
            className="hero is-fullheight background-image"
            style={{
              backgroundImage: `url(${backgroundImage[1]}&w=${this.state.innerWidth})`,
            }}
          >
            <div className="hero-body" style={{ paddingTop: "75px" }}>
              <div className="container ">
                <div className="columns has-text-centered" style={styles.columns}>
                  <div className="column">
                    <h3 className="title has-text-black" style={{ textAlign: "center" }}>
                      Registration has been Closed.
                    </h3>
                    <span className="subtitle has-text-danger is-6">
                      Onspot Registration will be done at Registration desk.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

export default Signup;

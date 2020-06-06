import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Layout from "./components/layout";
import { backgroundImage } from "../../archieve/collections";
import { AuthContext } from "./components/authContext";
import Cookies from "js-cookie";
const getUserData = require("../../utils/getUserData");
import Helmet from "react-helmet";

const config = {
  environment: Boolean(process.env.NODE_ENV !== "production"),
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isEmailExists: null,
      innerWidth: "",
      msg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
    // axios.post("/users/findByEmail", { email: e.target.value }).then(res => {
    //   if (res.status == 200) {
    //     this.setState({ isEmailExists: res.data });
    //   }
    // });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    const { setIsAuthenticated, setUser } = this.context;
    e.preventDefault();
    axios
      .post("/auth", this.state)
      .then((res) => {
        if (res.status == 200) {
          // setIsAuthenticated(true);
          const uid = Cookies.get("uid");
          getUserData(uid)
            .then((res) => {
              setUser(res.userData);
              setIsAuthenticated(true);
              this.props.history.push("/profile");
              // console.log(this.context)
            })
            .catch((err) => console.log(err));
        } else {
          this.setState({ msg: "incorrect email or password.", password: "" });
        }
      })
      .catch(() => {
        this.setState({
          msg: "That email/username and password combination didn't work. Try again.",
          password: "",
        });
      });
  }
  componentDidMount() {
    this.setState({ innerWidth: window.innerWidth });
  }
  static contextType = AuthContext;
  render() {
    const Prefetch = config.environment ? "false" : "true";
    return (
      <Layout title="Login Here">
        <Helmet>
          <title>Samnivesha | Login </title>
        </Helmet>
        <main className="main">
          <section
            className="hero is-fullheight background-image"
            style={{
              backgroundImage: `url(${backgroundImage[4]}&w=${this.state.innerWidth})`,
            }}
          >
            <div className="hero-body">
              <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                  <h3 className="title has-text-black">Login</h3>
                  <hr className="login-hr" />
                  <p className="subtitle has-text-black">Please login to proceed.</p>
                  <div className="box">
                    {this.state.msg && (
                      <div className="notification is-warning is-paddingless">
                        <strong>{this.state.msg}</strong>
                      </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                      <div className="field">
                        <p className="control has-icons-left has-icons-right">
                          <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon="envelope" />
                          </span>
                          <span className="icon is-small is-right">
                            {this.state.isEmailExists ? <FontAwesomeIcon icon="check" /> : null}
                          </span>
                        </p>
                      </div>

                      <div className="field">
                        <p className="control has-icons-left">
                          <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.onChangePassword}
                            value={this.state.password}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon="lock" />
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <button className="button is-success">Login</button>
                        </p>
                      </div>
                    </form>
                  </div>
                  <p className="has-text-grey">
                    <Link to="/signup" prefetch={Prefetch}>
                      Sign Up
                    </Link>
                    <Link to="/forgotPassword">&nbsp;·&nbsp; Forgot Password</Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}
export default Login;

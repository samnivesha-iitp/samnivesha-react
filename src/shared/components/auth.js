import react, { Component } from "react";
import Cookies from "js-cookie";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: ""
    };
  }
  isAuthenticated() {
    const sid = Cookies.get("sid");
    console.log(sid);
    return this.state.user;
  }
  isLoggedIn() {
    return this.state.isLoggedIn;
  }
  logout() {
    this.setState({ isLoggedIn: false, user: "" });
  }
}
export default new Auth();

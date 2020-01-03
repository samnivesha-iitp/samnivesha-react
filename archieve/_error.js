import React, { Component } from "react";
import { withRouter } from "next/router";

class errorPage extends Component {
  static getInitialProps({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr ? xhr.status : null;
    return { errorCode };
  }
  render() {
    var response;
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = (
          <div>
          </div>
        );
        break;
      case 500:
        response = (
          <div>
          </div>
        );
        break;
      default:
        response = (
          <div>
          </div>
        );
    }

    return response;
  }
}
export default withRouter(errorPage);

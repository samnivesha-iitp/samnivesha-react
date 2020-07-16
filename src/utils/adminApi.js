const Cookies = require("js-cookie");
const bcryptjs = require("bcryptjs");

class AuthAdmin {
  constructor() {
    this.username = "admin";
    this.password = "heisenberg";
    this.secret = "everyonehassecret";
  }
  getAdminCookie() {
    return Cookies.get("admin");
  }
  async isLogin() {
    try {
      const res = await bcryptjs.compare(this.secret, this.getAdminCookie());
      return res;
    } catch (err) {
      return false;
    }
  }
  async login(username, pwd) {
    if (await this.isLogin()) {
      return true;
    } else {
      if (this.username === username && this.password === pwd) {
        try {
          const salt = await bcryptjs.genSalt(14);
          const hash = await bcryptjs.hash(this.secret, salt);
          Cookies.set("admin", hash, { expires: 1, path: "/admin" });
          return true;
        } catch (err) {
          console.log("Admin Error while Logging in", err);
          return false;
        }
      } else {
        return false;
      }
    }
  }
  logout() {
    Cookies.remove("admin", { path: "/admin" });
    return true;
  }
}
export default AuthAdmin;

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    let userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
    let tokenExpTime = userInfo?.tokenExpTime;
    let now = new Date();
    let expDate = new Date(tokenExpTime);

    if (tokenExpTime && now.getTime() < expDate.getTime()) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
      localStorage.clear();
    }

    return this.authenticated;
  }
}

export default new Auth();

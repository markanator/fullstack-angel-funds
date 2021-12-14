class TokenIntercepter {
  constructor() {
    this.accessToken = null;
  }
  accessToken = "";

  setUserToken = (token: string) => {
    window.localStorage.setItem('token', token);
    this.accessToken = token
  }

  setAccessToken = (config) => {
    if (!config.headers) {
      config.headers = {}
    }
    const token = this.accessToken
    config.headers.Authorization = 'Bearer ' + token
    return config
  }

  removeUserToken = (token = "") => {
    this.accessToken = token;
    window.localStorage.setItem('token', token);
    window.localStorage.removeItem('token')
  }

  setTokenFromLS = (config) => {
    const newToken = window.localStorage.getItem('token');
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = 'Bearer ' + newToken
    return config
  }

  watchOutgoing = (config) => {
    if (!this.accessToken) {
      return this.setAccessToken(config)
    }
    return this.setTokenFromLS(config)
  }

}

export default new TokenIntercepter();
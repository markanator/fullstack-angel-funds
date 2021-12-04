class TokenIntercepter {
  constructor() {
    this.accessToken = null;
  }
  accessToken = "";

  setNewUserToken = (token: string) => {
    window.localStorage.setItem('token', token);
    this.accessToken = token
  }

  getNewConfig = (config) => {
    if (!config.headers) {
      config.headers = {}
    }
    const token = this.accessToken
    config.headers.Authorization = 'Bearer ' + token
    return config
  }

  getTokenFromLS = (config) => {
    const newToken = window.localStorage.getItem('token');
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = 'Bearer ' + newToken
    return config
  }

  watchOutgoing = (config) => {
    if (!this.accessToken) {
      return this.getNewConfig(config)
    }
    return this.getTokenFromLS(config)
  }

}

export default new TokenIntercepter();
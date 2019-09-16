const axios = require('axios')

class Base {
  constructor (req) {
    this.req = req
    this.timeout = 30000
    this.client = null
  }

  createClient () {
    return axios.create({
      baseURL: `${this.serviceHost}`,
      timeout: this.timeout,
      headers: this.req ? this.serviceHeader : {}
    })
  }

  createRequest () {
    if (this.req) {
      Object.assign(this.req.headers, this.serviceHeader)
    }

    this.client = this.createClient()
    // this.assignClienetInterceptors()

    return {
      get (target, method) {
        if (method in target) {
          return target[method]
        } else if (target.client && (method in target.client)) {
          return target.client[method]
        }
      }
    }
  }
}

module.exports = Base
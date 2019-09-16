class HttpError extends Error {
  constructor (status, message) {
    super(message || 'http_error')

    this.status = status
    this.message = message
  }

  getStatus () {
    return this.status
  }

  getMessage () {
    return this.message
  }
}

module.exports = HttpError
const express = require('express')
const errorHandler = require('./errors/handler')

class Server {
  constructor (config) {
    this.config = config
    this.app = express()
    this.endpoints = []
    this.routers = []
  }

  registerRoutes () {
    this.app.get('/', (req, res) => res.json({message: `welcome to ${this.config.name}`}))
    
    this.routers.forEach(router => {
      let routes = router(express.Router())
      this.app.use(this.registerRoute(routes))
    })

    this.app.get('/endpoints', (req, res) => res.json(this.endpoints))
  }

  registerRoute (routes) {
    routes.stack.forEach((stack, i) => {
      if (stack.route) {
        this.endpoints.push({
          method: stack.route.stack[0].method.toUpperCase(),
          path: stack.route.path
        })
      }
    })

    return routes
  }

  router (router) {
    if (typeof router === 'function') {
      this.routers.push(router)
    }
  }

  setUpServer () {
    this.registerRoutes()
    this.app.use(errorHandler())
    this.app.listen(this.config.port, this.listeningReporter)
  }

  listeningReporter () {
    const { address, port } = this.address()
    const protocol = this.addContext ? 'https' : 'http'
    console.log(`Listening on ${protocol}://${address}:${port}...`)
  }

  run () {
    try {
      this.setUpServer()
    } catch (e) {
      console.log(e.message || 'Error create server')
    }
  }
}

module.exports = Server
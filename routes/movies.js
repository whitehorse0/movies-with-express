const Controller = require('../controllers/movie')

module.exports = router => {
  router.get('/movies', Controller.fetch)
  router.get('/movies/:id', Controller.show)

  return router
}
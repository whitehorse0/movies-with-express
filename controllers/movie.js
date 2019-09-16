require('dotenv').config()
const _ = require('lodash')
const OmdbAPI = require('./../services/OmdbAPI')

module.exports = {
  fetch : async (req, res, next) => {
    const query = _.pick(req.query, ['title', 'search', 'type', 'year', 'page'])
    
    const reqQuery = {
      t: query.title,
      s: query.search,
      y: query.year,
      type: query.type,
      page: query.page,
      apiKey: process.env.API_KEY
    }
    
    const response = await new OmdbAPI(req).get('/', {
      params: reqQuery
    })

    let pagination = {}
    if (response.data.hasOwnProperty('Search')) {
      pagination = {
        meta : {
          pagination: {
            data_per_page: response.data.Search.length,
            current_page: query.page ? query.page : 1,
            total_page: Math.ceil(response.data.totalResults / 10), // make it simple Omdb provide data per page is 10
          }
        }
      }
    }

    const transformer = {
      code: response.status,
      message: 'OK',
      data: response.data,
      ...pagination
    }

    res.send(transformer)
  },

  show : async (req, res, next) => {
    const id = req.params.id
    const response = await new OmdbAPI(req).get('/', {
      params: { i: id, apiKey: process.env.API_KEY }
    })

    res.send({
      code: response.status,
      message: 'OK',
      data: response.data
    })
  }
}
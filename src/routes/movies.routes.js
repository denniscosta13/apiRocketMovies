const { Router } = require("express")
const moviesRoutes = Router()

const MoviesController = require("../controllers/MoviesController")
const moviesController = new MoviesController()

/** http verbs */
moviesRoutes.post("/:user_id",moviesController.create)




/** exports */
module.exports = moviesRoutes
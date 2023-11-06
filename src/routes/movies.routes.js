const { Router } = require("express")
const moviesRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")


const MoviesController = require("../controllers/MoviesController")
const moviesController = new MoviesController()

/** http verbs */
moviesRoutes.use(ensureAuthenticated)

moviesRoutes.get("/", moviesController.index)
moviesRoutes.post("/", moviesController.create)
moviesRoutes.get("/:id", moviesController.show)
moviesRoutes.delete("/:id", moviesController.delete)




/** exports */
module.exports = moviesRoutes
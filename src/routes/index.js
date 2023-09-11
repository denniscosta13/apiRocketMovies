const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")
const moviesRoutes = require("./movies.routes")

/** routes use */

routes.use("/users",usersRoutes)
routes.use("/movies",moviesRoutes)



/** exports */
module.exports = routes
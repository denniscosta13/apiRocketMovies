const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")

/** routes use */

routes.use("/users",usersRoutes)



/** exports */
module.exports = routes
const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")

/** routes use */

routes.use("/user",usersRoutes)



/** exports */
module.exports = routes
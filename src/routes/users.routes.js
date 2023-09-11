const { Router } = require("express")
const usersRoutes = Router()

/** http verbs */
usersRoutes.post("/")
usersRoutes.put("/:id")


/** exports */
module.exports = usersRoutes
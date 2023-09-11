const { Router } = require("express")
const usersRoutes = Router()

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

/** http verbs */
usersRoutes.post("/",usersController.create)
usersRoutes.post("/:id",usersController.update)



/** exports */
module.exports = usersRoutes
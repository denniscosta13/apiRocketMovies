const { Router } = require("express")
const usersRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

/** http verbs */
usersRoutes.post("/",usersController.create)
usersRoutes.post("/:id", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)



/** exports */
module.exports = usersRoutes
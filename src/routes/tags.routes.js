const { Router } = require("express")
const tagsRoutes = Router()

const ensureAuthenticated = require("../middleware/ensureAuthenticated")


const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

/** http verbs */

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)




/** exports */
module.exports = tagsRoutes
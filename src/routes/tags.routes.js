const { Router } = require("express")
const tagsRoutes = Router()

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

/** http verbs */

tagsRoutes.get("/:user_id", tagsController.index)




/** exports */
module.exports = tagsRoutes
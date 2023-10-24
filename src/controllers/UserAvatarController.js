const knex = require("knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
const { response } = require("express")

const diskStorage = new DiskStorage()

class UserAvatarController {
    async update(req, res) {
        const user_id = req.user.id
        const avatarFileName = req.file.filename

        const user = await knex("users").where({ id: user_id }).first()

        if(!user) {
            throw AppError("Usuário não autenticado.", 401)
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFileName)

        user.avatar = filename

        await knex("users")
            .update(user)
            .where({id: user_id})

        return res.json()
    }
}

module.exports = UserAvatarController
const AppError = require("../utils/AppError")

const knex = require("../database/knex")
const { compare } = require("bcrypt")

const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")


class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex("users").where({ email }).first();
        checkIfUserExists(user)
        
        const passwordMatched = await compare(password, user.password);
        checkIfPasswordMatched(passwordMatched)

        const token = createToken(user)

        return response.json({ user, token })

    }

}

function checkIfUserExists(user) {
    if(!user) {
        throw new AppError("E-mail e/ou senha incorreta", 401)
    }
}

function checkIfPasswordMatched(passwordMatchResult) {
    if(!passwordMatchResult) {
        throw new AppError("E-mail e/ou senha incorreta", 401)
    }
}

function createToken(payload) {
    const { secret, expiresIn } = authConfig.jwt

    const token = sign(
        {user_id: String(payload.id)},
        secret,
        { expiresIn }
    )

    return token
}

module.exports = SessionsController
const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const bcrypt = require("bcrypt")

class UsersController {
  async create(req, res) {
    const { name, email, password} = req.body

    const userExists = await knex("users").where({ email }).first()

    if(userExists) {
      throw new AppError("E-mail já cadastrado")
    }

    const hashedPassword = await bcrypt.hash(password,8)

    const [id] = await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, old_password, password } = req.body
    const user_id = req.user.id
    
    const [user] = await knex("users").where({ id: user_id })
    let checkEmailExists

    if(!user) {
      throw new AppError("Usuário não encontrado.")
    }

    if(email) {
      checkEmailExists = await knex("users").where({ email }).first()
    }

    if(checkEmailExists && checkEmailExists.id !== user.id) {
      throw new AppError("E-mail já está em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")

    } else if(!password && old_password) {
      throw new AppError("Você precisa informar a nova senha")

    } else if(!password && !old_password) {
      return res.json();

    } else {
      const checkOldPassword = await bcrypt.compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("Senha antiga incorreta.")
      }

      user.password = await bcrypt.hash(password, 8)
    }

    await knex("users")
    .where({ id: user_id })
    .update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    return res.json()
  }
}

module.exports = UsersController
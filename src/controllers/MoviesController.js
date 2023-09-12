const AppError = require("../utils/AppError")
const knex = require("../database/knex")


class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags} = req.body
    const { user_id } = req.params

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagInsert = tags.map(tagName => {
      return {
        movie_id,
        user_id,
        name: tagName
      }
    })

    await knex("tags").insert(tagInsert)

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const movies = await knex("movies").where({ id }).first()
    const tags = await knex("tags").where({ movie_id: id }).orderBy("name")

    return res.json({
      ...movies,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex("movies").where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    
  }
}

module.exports = MoviesController
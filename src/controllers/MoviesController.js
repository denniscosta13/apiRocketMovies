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

  // async update(req, res) {
    
  // }
}

module.exports = MoviesController
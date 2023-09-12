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

    res.status(201).json()
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
    const { user_id, title, tags} = req.query

    let movies;

    if(tags) {
      const tagsFilter = tags.split(',').map(tag => tag.trim())

      movies = await knex("tags").select([
        "movies.id",
        "movies.title",
        "movies.user_id",
        "movies.rating"
      ])
      .where("movies.user_id", user_id)
      .whereLike("movies.title", `%${title}%`)
      .whereIn("tags.name", tagsFilter)
      .innerJoin("movies","movies.id","tags.movie_id")
      .orderBy("movies.title")
    } else {
      movies = await knex("movies")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })

    const movieWithTags = movies.map(movie => {
      const movieTags = userTags.filter(tag => tag.movie_id == movie.id)

      return {
        ...movie,
        movieTags
      }
    })

    return res.json(movieWithTags)
  }
}

module.exports = MoviesController
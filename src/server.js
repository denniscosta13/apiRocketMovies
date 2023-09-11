require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express")
const app = express()
const routes = require("./routes")

/** app use */

app.use(express.json())
app.use(routes)

app.use((error,req,res,next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

/** app listen */
const PORT = 3333
app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
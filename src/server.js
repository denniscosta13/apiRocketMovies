require("express-async-errors")

const express = require("express")
const app = express()


const PORT = 3333

/* ** APP Uses ** */

app.use(express.json())




app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
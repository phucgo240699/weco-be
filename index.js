const { authenticateToken } = require("./middlewares/authenticationToken")
const mongoose = require('mongoose')
const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')

dotEnv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use('/api/posts', authenticateToken, require('./routes/posts'))
app.use('/api/users', require('./routes/users'))

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_ATLAS,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log(`Server is running on port ${PORT}`)
        })
})
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use('/posts', require('./routes/posts'))

app.listen(PORT, () => {
    mongoose.connect('mongodb+srv://phucly:phucly@cluster0.jrz9yt5.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log(`Server is running on port ${PORT}`)
        })
})
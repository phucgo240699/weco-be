const { authenticateToken } = require("./middlewares/authenticationToken")
const mongoose = require('mongoose')
const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { StatusCode } = require("./constants")
const messages = require("./messages")

dotEnv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))
app.get('/users/emailConfirmation/:emailVerificationCode', async (req, res) => {
    try {
        const { emailVerificationCode } = req.params
        const decoded = await jwt.verify(emailVerificationCode, process.env.EMAIL_ENCODE_KEY)
        if (decoded.email) {
            await mongoose.model("users").findOneAndUpdate({
                email: decoded.email
            }, {
                isEmailVerified: true
            })
            res.status(StatusCode.success).sendFile('./public/verifyEmailSuccessfully.html', { root: __dirname });
        } else {
            res.status(StatusCode.success).sendFile('./public/verificationEmailExpired.html', { root: __dirname });
        }
    } catch (error) {
        res.status(StatusCode.success).sendFile('./public/verificationEmailExpired.html', { root: __dirname });
    }
})
app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_ATLAS,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log(`Server is running on port ${PORT}`)
        })
})
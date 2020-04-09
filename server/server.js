const express = require('express')

const app = express()

// import routes
const authRoutes = require('./routes/auth')

// middleware
app.use(authRoutes)

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
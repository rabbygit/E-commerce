const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const setRoute = require('./routes/route')

const app = express()

// app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('tiny'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

setRoute(app)

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message : "Content not found"
        })
    }
    res.status(500).json({
        message : "Internal server error"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
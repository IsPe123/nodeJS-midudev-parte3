const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('X-powered-by')

app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filterMovies = movies.filter(
            movie => movie.genre.includes(genre)
            //movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())   NOT CASE SENSITIVE
        )
        return res.json(filterMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) {
        return res.json(movie)
    }
    res.status(404).json({ message: 'not found' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})
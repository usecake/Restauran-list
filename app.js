const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim().toLowerCase()
  const matchedRestaurants = keyword
    ? restaurants.filter((restaurant) => {
        return ['name', 'category'].some((property) => restaurant[property].trim().toLowerCase().includes(keyword))
      })
    : restaurants
  res.render('index', { restaurants: matchedRestaurants, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => {
    return restaurant.id.toString() === id
  })
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

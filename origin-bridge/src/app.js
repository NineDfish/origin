const express = require('express')
const app = express()
const session = require('express-session')

app.use(express.json())

let sess = {
  name: process.env.COOKIE_NAME || 'origin-bridge',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}
if (process.env.NODE_ENV == 'production') {
  sess.cookie.secure = true
}
app.use(session(sess))

app.use(require('./controllers'))

app.listen(5000, () => {
  console.log('Origin-bridge listening on port 5000...')
})

module.exports = app


const express  =  require('express')
const routes = require('./routes/routes.js')
const app = express()
require('./db/connect.js')
// middleware

app.use(express.json())

//routes

app.use('/api/v1/note_taking_app',routes)

const port = 3000
app.listen(port, () => {
    console.log('server is running')
})

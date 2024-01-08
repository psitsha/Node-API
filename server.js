const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

//routes for web browser

app.get('/', (req, res) => {
    res.send('Hello Node API with CRUD')
})

app.get('/nodemon', (req, res) => {
    res.send('Hello Node with Nodemon')
    })
// mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://psitsha:123456Admin@politenodeapi.wriahvk.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, ()=> {
        console.log(`Node API app is running on port ${port}`)
    })    
}).catch((error) => {
    console.log(error)
})
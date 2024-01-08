const express = require('express')
const app = express()
const port = 3000

//routes
app.get('/', (req, res) => {
    res.send('Hello Node API with CRUD')
})


app.listen(port, ()=> {
    console.log(`Node API app is running on port ${port}`)
})
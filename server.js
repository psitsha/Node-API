const express = require('express')
const mongoose = require('mongoose')
const Product =  require('./models/productModel')
const app = express()
const port = 3000

//middleware
app.use(express.json())

//routes for web browser

app.get('/', (req, res) => {
    res.send('Hello Node API with CRUD')
})

app.get('/nodemon', (req, res) => {
    res.send('Hello Node with Nodemon')
    })

// save data into databse
app.post('/product', async(req, res) => {
    // console.log(req.body);
   // res.send(req.body)
   try {
        const product =  await Product.create(req.body)
        res.status(200).json(product);    
   } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
   }
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
const express = require('express')
const mongoose = require('mongoose')
const Product =  require('./models/productModel')
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes for web browser

app.get('/', (req, res) => {
    res.send('Hello Node API with CRUD')
})

app.get('/nodemon', (req, res) => {
    res.send('Hello Node with Nodemon')
    })

// fetch ALL data from database route
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// fetch a single product from the db route
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// save data into databse route
app.post('/products', async(req, res) => {
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

// Update a product route
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product =  await Product.findByIdAndUpdate(id, req.body);
        // product not found
        if(!product){
            return res.status(404).json({message: `Cannot find product with ID ${id}`})
        }
        // get latest info from the db
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find product with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
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
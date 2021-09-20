const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

const mongoose = require('mongoose')
const Product = require('./models/product')
const categories = ['fruit', 'vegetable', 'dairy']


mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log("connection open")
    })
    .catch(err => {
        console.log("error", err)
    })



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_METHOD'))

app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    // const products = await Product.find({})
    // console.log("products:", products)
    // //res.send("Products in console")
    // res.render('products/index', { products })
})
app.get('/products/new', (req, res) => {
    //console.log("here")
    res.render('products/new', { categories })
})

app.get('/products/:id/edit', async (req, res) => {
    console.log("render update form")
    const { id } = req.params
    const product = await Product.findById(id)
    console.log("edit product,", product)
    res.render('products/update', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    console.log("in put")
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body)
    res.redirect(`/products/${id}`)
    //res.redirect('/products')

    //res.send("put")
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log("product", product)
    //res.send("check console for product details")
    res.render('products/show', { product })
})

app.post('/products', async (req, res) => {
    console.log("req", req.body)
    const newProduct = Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct.id}`)

    //res.send("making new product")
})

app.delete('/products/:id', async (req, res) => {
    //res.send("in delete")
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')

})

app.listen(3000, () => {
    console.log("hello")
})
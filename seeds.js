const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log("connection open")
    })
    .catch(err => {
        console.log("error", err)
    })

const p = new Product({
    name: 'Grape fruit',
    price: 1,
    category: 'fruit'
})

const seedProducts = [
    {
        name: 'Papaya',
        price: 2,
        category: 'fruit'
    },
    {
        name: 'Banana',
        price: 3,
        category: 'fruit'
    },
    {
        name: 'Tomato',
        price: 2,
        category: 'fruit'
    },
    {
        name: 'Potato',
        price: 1,
        category: 'vegetable'
    },
    {
        name: 'Onion',
        price: 2,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res)
    })
    .catch(err => {
        console.log("error", err)
    })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(err => {
//         console.log("error", err)
//     })
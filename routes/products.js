const express = require('express')
const router = express.Router()
let Product = require("../models/product.model")

// Getting All
router.route("/").get((req, res) => {
    Product.find()
      .then((products) => res.json(products))
      .catch((err) => res.status(400).json("Error: " + err))
})

// Getting One
router.route("/:id").get((req, res) => {
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch((err) => res.status(400).json("Error: " + err))
})

// Creating One
router.route('/').post((req, res) => {
    const name = req.body.name
    const category = req.body.category
    const price = Number(req.body.price)
    const newProduct = new Product({
      name,
      category,
      price,
    })
    newProduct
      .save()
      .then(() => res.json("Product added!"))
      .catch((err) => res.status(400).json("Error: " + err))
  })

// Updating One
router.route("/:id").patch((req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        product.name = req.body.name
        product.category = req.body.category
        product.price = Number(req.body.price)
  
        product
          .save()
          .then(() => res.json("Product updated!"))
          .catch((err) => res.status(400).json("Error: " + err))
      })
      .catch((err) => res.status(400).json("Error: " + err))
})

// Deleting One
router.route("/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json("Product deleted."))
      .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
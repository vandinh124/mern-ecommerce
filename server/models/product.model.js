const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [
                true,
                "Name is required"
            ], 
            minlength: [
                3, 
                "Name must be at least 3 characters long"
            ]
        },
        description: {
            type: String,
            required: [
                true,
                "Description is required"
            ], 
            minlength: [
                3, 
                "Description must be at least 8 characters long"
            ]
        },
        category: {
            type: String,
            required: [
                true,
                "Category is required"
            ], 
            minlength: [
                3, 
                "Category must be at least 3 characters long"
            ]
        },
        imageUrl: {
            type: String,
            required: [
              true,
              'Please provide an image URL!'
            ]
          },
        price: {
            type: Number,
            required: [
                true,
                'Please provide the price of product'
            ]
        },
        quantity: {
            type: Number,
            required: [
                true,
                'Please provide the price of product'
            ] 
        },
        
},{timestamps: true});

module.exports.Product = mongoose.model("Product", ProductSchema);

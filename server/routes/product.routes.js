const ProductController = require('../controllers/product.controller')

const { authenticate } = require('../config/jwt.config')
module.exports = function (app){
    app.post('/api/products', ProductController.createProduct); 
    app.get('/api/products', authenticate, ProductController.getAll);
    app.get('/api/products/:id', ProductController.getOne);
    app.delete('/api/products/:id', ProductController.delete);
    app.put('/api/products/:id', ProductController.UpdateProduct)
}
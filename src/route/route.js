const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const userController = require("../controller/userController");
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const orderController = require('../controller/orderController')
const middleware = require('../middleware/middleware');


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/user/:userId/profile', middleware.auth, middleware.authorisation, userController.getUserProfileById)
router.put('/user/:userId/profile', middleware.auth, middleware.authorisation, userController.updateUserProfileById)

router.post('/products', productController.createProduct);
router.get('/products', productController.getProudcts);
router.get('/products/:productId', productController.getProductById);
router.put('/products/:productId', productController.updateProductById);
router.delete('/products/:productId', productController.deleteProductById)

router.post('/users/:userId/cart', middleware.auth, middleware.authorisation, cartController.createCart);
router.put('/users/:userId/cart', middleware.auth, middleware.authorisation, cartController.updateCart);
router.get('/users/:userId/cart', middleware.auth, middleware.authorisation, cartController.getCart);
router.delete('/users/:userId/cart', middleware.auth, middleware.authorisation, cartController.deleteCart);

router.post('/users/:userId/orders', middleware.auth, middleware.authorisation, orderController.createOrder);
router.put('/users/:userId/orders', middleware.auth, middleware.authorisation, orderController.updateOrder);

module.exports = router;
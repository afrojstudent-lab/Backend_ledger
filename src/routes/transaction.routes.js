const {Router} = require('express');
const authMiddleware = require("../middlewares/auth.middleware")
const transactionContoller = require('../controllers/transaction.controller')
const transactionRoutes = Router();


transactionRoutes.post('/',authMiddleware.authMiddleware,transactionContoller.createTransaction)

transactionRoutes.post('/system/intial-funds',authMiddleware.authSystemUserMiddleware,transactionContoller.createInitialFundsTransaction)

module.exports = transactionRoutes
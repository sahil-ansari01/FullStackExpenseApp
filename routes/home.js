const express = require('express');
const router = express.Router();

const homeController = require('../controller/home');

router.get('/', homeController.getHome);

router.post('/add-expense', homeController.addExpense);

router.get('/get-expense', homeController.getExpense);

router.delete('/delete-expense/:id', homeController.deleteExpense);

router.put('/update-expense/:id', homeController.updateExpense);

module.exports = router;
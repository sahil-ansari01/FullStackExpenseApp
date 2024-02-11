const Expense = require('../models/expenseData');
const path = require('path');

exports.getHome = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    } catch {
        res.status(404).json({
            error: err
        })
    }
};


exports.addExpense = async (req, res, next) => {
    try {
        const { amount, name, category } = req.body;

        const expenseData = await Expense.create({
            amount: amount,
            name: name,
            category: category
        });
        console.log(expenseData);
        res.status(201).json({ expenseData: expenseData });
    } catch {
        res.status(500).json({
            error: err
        });
    }
};

exports.getExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findAll();
        console.log(expense);
        res.status(200).json( { expense : expense });
    } catch {
        res.status(500).json({ 
            error: err
        })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).json( {
                err: "ID is missing"
            })
        }

        const expenseId = req.params.id;
        await Expense.destroy( {
            where: { id: expenseId }
        });
        res.status(200);
    } catch (err) {
        console.log(err);
    }
};

exports.updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, name, category } = req.body;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                error: "Expense data not found"
            })
        }

        expense.amount = amount;
        expense.name = name;
        expense.category = category;

        await expense.save();

        res.status(200).json({
            message:"Expense data updated successfully!", 
            expense
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal server error!"
        });
    }
}
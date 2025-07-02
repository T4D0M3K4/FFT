// Biblioteke:
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Router-i:
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');
const categoryRouter = require('./routers/category-router');
const budgetRouter = require('./routers/budget-router');
const transactionRouter = require('./routers/transaction-router');
const billRouter = require('./routers/bill-router');
const uploadRouter = require('./routers/upload-router');

// Baza:
const dbConfig = require('./config/db-config');

const app = express();

// app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/budgets', budgetRouter);
app.use('/transactions', transactionRouter);
app.use('/bills', billRouter);
app.use('/upload', uploadRouter);

dbConfig.authenticate()
    .then(() => {console.log('Povezano!')})
    .catch((err) => {console.log(err)})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server na ' + PORT + '!');
})
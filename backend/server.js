const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routers/auth-router');

const dbConfig = require('./config/db-config');

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use('', authRouter);

dbConfig.authenticate()
    .then(() => {console.log('Povezano!')})
    .catch((err) => {console.log(err)})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server na ' + PORT + '!');
})
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

const uri = process.env.MONGODB_VSCODE;

mongoose
  .connect(
    'mongodb+srv://ahzamnaseem:ahzamnaseem@cluster0.zu8apyh.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Database Connection Successfull');
  })
  .catch(err => {
    console.log('Error connecting to mongodb : ', err);
  });

app.listen(PORT, () => {
  console.log('Server is running at port ', PORT);
});

// Endpoint to register in the application

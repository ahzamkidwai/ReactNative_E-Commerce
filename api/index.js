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

// Function to send Verification Email to the Server

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a nodemailer Transport
  const transporter = nodemailer.create({
    // configure the email service
    service: 'gmail',
    auth: {
      user: 'ahzamnaseem@gmail.com',
      pass: 'plggwauyulslrxww',
    },
  });

  // Compose the Email message
  const mailOptions = {
    from: 'https://www.amazon.com',
    to: email,
    subject: 'E-Mail Verification',
    text: `Please click on the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the E-Mail
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending Verification Email : ', error);
  }
};

// Endpoint to register in the application

const User = require('./models/user');
const Order = require('./models/order');

app.post('/', async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // Check Email is already registered
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: 'E-Mail already registered',
      });
    }

    // Create a new user

    const newUser = new User({name, email, password});

    // Generate and store a verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // Save the user to the database
    await newUser.save();

    // Send verification Email to the User

    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log('Error occured while registering user : ', error);
    res.status(500).json({
      success: false,
      message: 'Registration Failed',
    });
  }
});

// Endpoint to verify the email

app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user with the given verification token
    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Invalid Email Verification Token',
      });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'E-Mail verified Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Email Verification Failed',
    });
  }
});

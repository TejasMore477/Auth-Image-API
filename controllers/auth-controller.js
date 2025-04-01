// imports
const User = require("../model/user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// these are controllers not middleware so no need to use "next"
const registerController = async (req, res) => {

    // get the user info from req.body
    // check if all the fields are complete filled
    // check if user already exists?
    // hash the password
    // register the new user in the db



  try {
    // get the user info from req.body
    const { userName, email, password, role } = req.body;

    // check if all the fields are complete filled
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "username, email, password fields are required to complete registeration",
      });
    }

    // check if user already exists?
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with following credentials already Exists",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // register the new user in the db
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "error occured while registering new user to db after hashing",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("\n Error occured while registering the user : ", error);
    
    res.status(500).json({
      success: false,
      message: "internal server error occured while registering user",
      data: error.message,
    });
  }
};

const loginController = async (req, res) => {

    // get the user info from req.body
    // check if all the fields are complete filled
    // check if user already exists?
    // checking the password  --bcrypt.compare
    // creating bearer token using jwt.sign
    // send the brearer token back to frontend using response


  try {
    // get the user info from req.body
    const { userName, email, password, role } = req.body;

    // check if all the fields are complete filled
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "username, email, password fields are required to complete registeration",
      });
    }

    // check if user already exists?
    const existingUser = await User.findOne({ $and : [{ userName }, { email }] });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with following credentials does not Exists",
      });
    };

    // checking the password
    const isPasswordMatch = await bcrypt.compare(password,existingUser.password);

    if(!isPasswordMatch){
      return res.status(400).json({
        success: false,
        message : "User doesnot exist in DB for these credentials"
      });
    };

    // creating bearer token
    const bearerToken = jwt.sign({
        userId : existingUser._id,
        userName : existingUser.userName,
        email : existingUser.email,
        role : existingUser.role
    } ,process.env.JWT_SECRET_KEY,{
        expiresIn : '20m'
    });

    res.status(200).json({
        success : true,
        message : "loged in succussfull",
        bearerToken 
    });



  } catch (error) {
    console.error("\n Error occured while  loging-in the user : ", error);
    
    res.status(500).json({
      success: false,
      message: "internal server error occured while loging-in user",
      data: error.message,
    });
  }
};

module.exports = { registerController, loginController };

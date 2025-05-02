import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try{
    const { name, email, password, country } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      country
    });

    res.json({
      message : "User created successfully",
      data : user,
    })
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
}

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try{
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    // Check for user
    const user = await User.findOne({ email : email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    //create jwt
    const token = await user.generateAuthToken();
    // const token = await jwt.sign(user._id, process.env.JWT_SECRET);

    //wrap the token in cookies
    res.cookie("token",token);

    //user found -> return data of user
    res.json({
        message : "Data fetched successfully",
        data : user,
    });

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try{
    const user = req.user;

    res.json({
      message : "User fetched successfully",
      data: user
    });
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
export const logout = async (req, res) => {
  try{
    res.cookie("token",null,{expires : new Date(0)});
    res.json({
      message : "Logout successfully",
    });

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};
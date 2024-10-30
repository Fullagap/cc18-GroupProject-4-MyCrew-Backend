const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.register = async(req,res,next)=>{
  
    try {
        res.json("register successful")
    } catch (err) {
        next(err)
    }
}

exports.login = async(req,res,next)=>{
    try {
        res.json("Login successfully")
    } catch (err) {
        next(err)
    }
}

exports.changePassword = async(req,res,next)=>{
    try {
        res.json('Change password')
    } catch (err) {
        next(err)
    }
}

exports.updateProfile = async(req,res,next)=>{
    try {
        res.json("Update profile")
    } catch (err) {
        next(err)
    }
}


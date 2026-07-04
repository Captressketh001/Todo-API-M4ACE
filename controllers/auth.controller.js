import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ $or: [{email}, {username}]});

        if (existingUser){
            res.status(400).json({status: 400, data: null, msg: 'User already exist'})
        }
        const user = await User.create({
            username,
            email,
            password
        })
        res.status(201).json({status: 201, data: user, msg: 'user created succesfully!'})
    } catch(err){
        res.status(500).json({status: 500, data: null, msg: 'Server error!'})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email})

        if (!user || !(await user.comparePassword(password))){
            res.status(400).json({status: 400, data: null, msg: "Incorrect email or password" })
        }

        // generate jwt token

        const token = generateToken(user._id)
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({status: 200, data: {token}, msg: 'Login Successful!'})
    } catch(err){
        res.status(500).json({status: 500, data: null, msg: 'Server error!'})
    }
}
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists", 
                success: false, 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });

        // Save user to DB
        await newUser.save();

        return res.status(201).json({
            message: "Signup success",
            success: true,
            newUser
        });

    } catch (err) {
        console.error("Signup Error:", err); 
        return res.status(500).json({
            message: "Signup failed",
            success: false,
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        const errMessage = "Auth failed email or password is strong"

        if (!existingUser) {
            return res.status(409).json({
                message: errMessage, 
                success: false, 
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordEqual){
            return res.status(403).json({message: errMessage, success: false})
        }

        const jwtToken = jwt.sign(
            {email: existingUser.email, _id: existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )
      

        return res.status(201).json({
            message: "Login success",
            success: true,
            existingUser,
            jwtToken,
            email,
            
        });

    } catch (err) {
        console.error("login Error:", err); 
        return res.status(500).json({
            message: "Signup failed",
            success: false,
        });
    }
};


module.exports = { signUp , login};

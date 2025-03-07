const jwt = require("jsonwebtoken")

const ensureAuthenticated = (req, res, next)=>{
    const auth = req.headers["authorization"]
    if(!auth){
        return res.status(403)
        .json({message: "unauthorised, token"})
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        return res.status(400).json({message: "Unauthorised jwt token"})
    }
}



module.exports = ensureAuthenticated;

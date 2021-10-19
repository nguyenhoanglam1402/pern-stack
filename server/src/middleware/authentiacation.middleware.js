const jwt = require("jsonwebtoken");

const authUser = (req,res,next) => {
    if (req.user === null) {
        return res.status(403).json({
            message: "User must be signed in"
        })
    }
    else{
        next();
    }
}

const authRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(401).json({
                message: "Access denied"
            })
        }
        else {
            next();
        }
    }
}
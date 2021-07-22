const jwt = require("jsonwebtoken");

const  auth = (req, res, next)=> {

    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_SCRET, (err, user)=>{
            if(err) return res.status(400).json({msg:err.message + " Authorization not valid"});
            req.user = user;
            next()
        })

    }catch(err) {
        return  res.status(500).json({msg: err.message})
      }

}

module.exports= auth;
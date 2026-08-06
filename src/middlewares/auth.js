const jwt=require("jsonwebtoken");
const User =require("../models/user");

const userAuth=async(req,res,next)=>{
  console.log("userAuth")
    try {
        const {token} = req.cookies;
            if(!token){
              //throw new Error("Invalid Token");
              return res.status(401).send("Please login again")
            }
            const decodedMessage= await jwt.verify(token,"DevTinder@Sob");
            const {_id}=decodedMessage;
            //console.log("decodedMessage ",decodedMessage)
            const user=await User.findById({_id});
            if(!user){
              throw new Error("User doesn't Exists")
            }
            req.user=user;
            next();
    } catch (err) {
      console.log("userAuth err ",err.message)
        res.status(400).send("User Authentication Error :"+ err.message);
    }
}

module.exports={userAuth};
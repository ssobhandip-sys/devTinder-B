const adminAuth=(req,res,next)=>{
    console.log("admin authorization is implemented")
    const token="xyz"
    const isAdminAuthorize=token==="xyz";
    if(!isAdminAuthorize){
        res.status(401).send("admin is not authorized")
    }else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    console.log("user authorization is implemented")
    const token="xyz"
    const isuserAuthorize=token==="xyz";
    if(!isuserAuthorize){
        res.status(401).send("user is not authorized")
    }else{
        next();
    }
}

module.exports={adminAuth,userAuth};
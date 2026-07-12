const mongoose=require('mongoose');


const connectDb=async ()=>{
    await mongoose.connect(
        "mongodb+srv://ssobhandip_NamasteNode:Dk3PWy0Rgdd33i8b@namastenode.siwbegt.mongodb.net/devTinder"
    )
}

module.exports=connectDb;
 
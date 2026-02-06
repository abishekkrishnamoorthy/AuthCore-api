const db = require("mongoose")

const connectdb=async()=>{
    try{
    await db.connect('mongodb://127.0.0.1:27017/Authcore')
    console.log("success")
    }catch(err){
        console.error(err.error)
    }
}
module.exports=connectdb;
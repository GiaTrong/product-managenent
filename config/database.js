const { default: mongoose } = require("mongoose");

// connect database
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log("connect success")       
    } catch (error) {
        console.log("connect fail")   
        console.log(error)    
    }
}

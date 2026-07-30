const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-sys")

// check database connection
connect.then(() => {
    console.log("database connected successifully");
})
.catch(()=> {
console.log("databse has not been connected successfully")
})


// create schema
const loginschema = new mongoose.Schema({
name : {
    type: String,
    required: true
},
password : {
    type: String,
    required: true
}
})

const collection = new mongoose.model("users", loginschema)


module.exports = collection;
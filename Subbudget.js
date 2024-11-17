
const mongoose = require("mongoose")

const subsc = new mongoose.Schema({
    namebud:{
        type:String,
        required:true
    },

    subname:{
        type:String,
        required:true,
    },

    subamount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Subb",subsc)
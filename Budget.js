
const mongoose = require("mongoose")

const budsc = new mongoose.Schema({
    budname:{
        type:String,
        required:true
    },

    budamount:{
        type:Number,
        required:true
    },

    subbids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subb' }]
})

module.exports = mongoose.model("Budg" , budsc)
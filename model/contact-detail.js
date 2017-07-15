/**
 * Created by drox2014 on 7/15/2017.
 */
const mongoose = require('mongoose');

var ContactDetail = mongoose.model('ContactDetail', {
    res:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    designation:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:Number,
        required:true,
        trim:true
    }
});

module.exports = {ContactDetail};
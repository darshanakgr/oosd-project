/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    index:{
        type:String,
        required:true,
        unique:true
    },
    batch:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    }
});

module.exports = {Student};

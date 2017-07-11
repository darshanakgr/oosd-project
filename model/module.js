/**
 * Created by drox2014 on 7/10/2017.
 */

const mongoose = require('mongoose');

var Module = mongoose.model('Module', {
    moduleCode:{
        type:String,
        required:true,
        minlength:4,
        trim:true,
        unique:true
    },
    moduleName:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    credits:{
        type:Number,
        required:true,
        minlength:1
    }
});

module.exports = {Module};

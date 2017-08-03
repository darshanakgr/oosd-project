/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var User = mongoose.model('User', {
    email:{
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:function(value) {
                return validator.isEmail(value)
            },message:'{VALUE} is not a valid email '
        },
        required:[true,' Email field cant be empty']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    data:{
        type:String,
        required:[true,'More data is required']
    },
    access:{
        type:String,
        required:[true,'Access type is required']
    }
});

module.exports = {User};

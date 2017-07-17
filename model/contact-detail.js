/**
 * Created by drox2014 on 7/15/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var ContactDetail = mongoose.model('ContactDetail', {
    res:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        trim:true,
        validate:{
             validator:function(value){
                return /^[A-Za-z\s]*$/.test(value)
             },message:'{VALUE} is not a valid Name '
         },
        required:[true,'Name field is required']
    },
    designation:{
        type:String,
        trim:true,
        validate:{
            validator:function(value){
                return /^[a-zA-Z_\s]{2,}$/.test(value)
            },message:'{VALUE} is not a valid Designation '
        },
        required:[true,' Designation field cant be empty']
    },
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
    contact:{
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:function(value){
                return /^([0-9]{2,3})([- ]?)([0-9]{7})$/.test(value)
            },message:'{VALUE} is not a valid Contact No: '
        },
        required:[true,' contact field cant be empty'],
       }
});

module.exports = {ContactDetail};
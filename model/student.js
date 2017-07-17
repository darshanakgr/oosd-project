/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var Student = mongoose.model('Student', {
    index:{
        type:String,
        required:[true,'Index field cannot be empty'],
        unique:true,
        validate:{
            validator:function(value){
                return /^[0-9]{2}[01][0-9]{3}[A-Z]{1}$/.test(value)
            },message:'{VALUE} is not a valid Index '
        }
    },
    batch:{
        type:String,
        required:[true,'Batch Name is required'],
        validate:{
            validator:function(value){
                return /^([B][S][C][0-9]{2})$/.test(value);
            },message: '{VALUE} is not a validate Batch name'
        }
    },
    name:{
        type:String,
        validate:{
            validator:function(value){
                return /^[A-Za-z\s]*$/.test(value)
            },message:'{VALUE} is not a valid Name '
        },
        required:[true,'Name field is required']
    },
    address:{
        type:String,
        trim:true,
        validate:{
            validator:function(value){
                return /^[A-Za-z0-9,.\s]*$/.test(value)
            },message:'{VALUE} is not a valid Address '
        },
        required:[true,' Address field cannot be empty']
    },
    contact:{
        type:Number,
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

module.exports = {Student};

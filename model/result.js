/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var resultSchema = new mongoose.Schema({
    index:{
        type:String,
        required:[true,'Index field cannot be empty'],
        validate:{
            validator:function(value){
                return /^[0-9]{2}[01][0-9]{3}[A-Z]{1}$/.test(value)
            },message:'{VALUE} is not a valid Index '
        }
    },
    grade:{
        type:String,
        required:[true,'Grade cannot be empty'],
        validate:{
            validator:function(value){
                return /^[A-Z+-]{1,3}$/.test(value)
            },message:'{VALUE} is not a valid Grade '
        }
    },
    moduleCode:{
        type:String,
        required:[true,'Module Code cannot be empty'],
        trim:true,
        unique:[true,'Duplicate Module code'],
        validate:{
            validator:function(value){
                return /^[A-Z]{2}[0-9]{4}$/.test(value)
            },message:'{VALUE} is not a valid Module code '
        }
    },
    resultId:{
        type:String,
        required:true
    }
});

resultSchema.index({index:1, moduleCode:1}, {unique:true});

var Result = mongoose.model('Result', resultSchema);

module.exports = {Result};
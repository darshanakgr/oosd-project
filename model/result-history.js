/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var resultHistory = new mongoose.Schema({
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
    moduleDetailId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:[true,'Date cannot be empty']
    },
    user:{
        type:String,
        required:true
    }
});

resultHistory.index({moduleCode:1, moduleDetailId:1},{unique:true});

var ResultHistory = mongoose.model('ResultHistory', resultHistory);

module.exports = {ResultHistory};
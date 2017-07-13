/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');

var resultHistory = new mongoose.Schema({
    moduleCode:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    moduleDetailId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:String,
        required:true
    }
});

resultHistory.index({moduleCode:1, moduleDetailId:1},{unique:true});

var ResultHistory = mongoose.model('ResultHistory', resultHistory);

module.exports = {ResultHistory};
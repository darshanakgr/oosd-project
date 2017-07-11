/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
    index:{
        type:String,
        minlength:7,
        trim:true,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    moduleCode:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    resultId:{
        type:String,
        required:true
    }
});

resultSchema.index({index:1, moduleCode:1}, {unique:true});

var Result = mongoose.model('Result', resultSchema);

module.exports = {Result};
/**
 * Created by drox2014 on 7/10/2017.
 */

const mongoose = require('mongoose');

var modules = new mongoose.Schema({
    moduleCode:{
        type:String,
        required:true,
        minlength:4,
        trim:true
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
    },
    batch:{
        type:String,
        required:true,
        minlength:5,
        trim:true
    },
    semester:{
        type:Number,
        required:true,
        minlength:5,
        trim:true
    }
});

modules.index({moduleCode:1, batch:1}, {unique:true});

var Modules = mongoose.model('Modules', modules);

module.exports = {Modules};
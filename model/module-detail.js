/**
 * Created by drox2014 on 7/11/2017.
 */

const mongoose = require('mongoose');

var moduleDetailSchema = new mongoose.Schema({
    moduleCode:{
        type:String,
        required:true
    },
    lecturerId:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    }
});

moduleDetailSchema.index({moduleCode:1, batch:1}, {unique:true});

var ModuleDetail = mongoose.model('ModuleDetail', moduleDetailSchema);

module.exports = {ModuleDetail};
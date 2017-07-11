/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');

var courseModuleSchema = new mongoose.Schema({
    index:{
        type:String,
        required:true
    },
    moduleCode:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    }
});

courseModuleSchema.index({moduleCode:1, index:1}, {unique:true});

var CourseModule = mongoose.model('CourseModule', courseModuleSchema);

module.exports = {CourseModule};
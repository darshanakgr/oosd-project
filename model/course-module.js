/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var courseModuleSchema = new mongoose.Schema({
    index:{
        type:String,
        required:[true,'Index field cannot be empty'],
        validate:{
            validator:function(value){
                return /^[0-9]{2}[01][0-9]{3}[A-Z]{1}$/.test(value)
            },message:'{VALUE} is not a valid Index '
        }
    },
    moduleCode:{
        type:String,
        required:[true,'Module Code cannot be empty'],
        unique:true,
        trim:true,
        validate:{
            validator:function(value){
                return /^[A-Z]{2}[0-9]{4}$/.test(value)
            },message:'{VALUE} is not a valid Module code '
        }
    },
    credits:{
        type:Number,
        required:[true,'credit field cannot be empty'],
        validate:{
            validator:function(value){
                return validator.isDecimal(value)
            },message:'{VALUE} is not a valid credit value '
        }
    }
});

courseModuleSchema.index({moduleCode:1, index:1}, {unique:true});

var CourseModule = mongoose.model('CourseModule', courseModuleSchema);

module.exports = {CourseModule};
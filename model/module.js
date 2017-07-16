/**
 * Created by drox2014 on 7/10/2017.
 */

const mongoose = require('mongoose');
const validator= require('validator');

var Module = mongoose.model('Module', {
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
    moduleName:{
        type:String,
        required:[true,'Module Name cannot be empty'],
        trim:true,
        validate:{
            validator:function(value){
                return /^[A-Za-z\s]*$/.test(value)
            },message:'{VALUE} is not a valid Module Name '
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

module.exports = {Module};

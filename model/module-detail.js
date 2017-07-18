/**
 * Created by drox2014 on 7/11/2017.
 */

const mongoose = require('mongoose');
const validator= require('validator');

var moduleDetailSchema = new mongoose.Schema({
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
    lecturerId:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return /^([B][S][C][0-9]{2})$/.test(value);
            },message: '{VALUE} is not a validate Batch name'
        }
    },
    semester:{
        type:Number,
        required:true,
        min:[0,'Invalid Semester'],
        max:[9,'Invalid Semester']

    }
});

moduleDetailSchema.index({moduleCode:1, batch:1}, {unique:true});

var ModuleDetail = mongoose.model('ModuleDetail', moduleDetailSchema);

module.exports = {ModuleDetail};
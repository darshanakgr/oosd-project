/**
 * Created by drox2014 on 7/11/2017.
 */

const mongoose = require('mongoose');
const validator= require('validator');

var lecturerSchema = new mongoose.Schema({
    res:{
        type:String,
        required:[true,'title cannot be empty'],
        validate:{
            validator:function(value){
                return /^[A-Za-z]*$/.test(value)
            },message:'{VALUE} is not a valid title '
        }
    },
    name:{
        type:String,
        required:[true,'Name field cannot be empty'],
        validate:{
            validator:function(value){
                return /^[A-Za-z\s]*$/.test(value)
            },message:'{VALUE} is not a valid Name '
        }
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:function(value) {
                return validator.isEmail(value)
            },message:'{VALUE} is not a valid email '
        },
        required:[true,' Email field cant be empty']
    }
});

var Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = {Lecturer};

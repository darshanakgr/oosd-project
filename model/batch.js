/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var Batch = mongoose.model('Batch', {
    batchName: {
        type:String,
        required:[true,'Batch Name is required'],
        unique:[true,'Batch name is already registered'],
        validate:{
            validator:function(value){
                return /^([B][S][C][0-9]{2})$/.test(value);
            },message: '{VALUE} is not a validate Batch name'
        }
    }
});


module.exports = {Batch};

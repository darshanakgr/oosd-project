/**
 * Created by drox2014 on 7/15/2017.
 */

const mongoose = require('mongoose');
const validator= require('validator');

var Timetable = mongoose.model('Timetable', {
    timetableType:{
        type:String,
        required:true,
        enum:['SEM','LAB','LEC']
    },
    data:{
        type:Object
    },
    rows:{
        type:Object
    }
});


module.exports = {Timetable};
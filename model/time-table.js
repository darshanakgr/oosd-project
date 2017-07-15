/**
 * Created by drox2014 on 7/15/2017.
 */

const mongoose = require('mongoose');

var Timetable = mongoose.model('Timetable', {
    timetableType:{
        type:String,
        required:true
    },
    data:{
        type:Object
    },
    rows:{
        type:Object
    }
});


module.exports = {Timetable};
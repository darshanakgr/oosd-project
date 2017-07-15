/**
 * Created by drox2014 on 7/11/2017.
 */

const mongoose = require('mongoose');

var lecturerSchema = new mongoose.Schema({
    res:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

var Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = {Lecturer};

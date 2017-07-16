/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');

var Batch = mongoose.model('Batch', {
    batchName: {
        type:String,
        required:true,
        unique:true
    }
});


//edited by BT

module.exports = {Batch};

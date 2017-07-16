/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');

var Notice = mongoose.model('Notice',{
    title: {
        type : String,
        trim:true
    },
    state: {
        type : String,
        default:"new"
    },
    content: {

    },
    sender: {

    },
    receivers: {

    },
    type:{

    },
    exDate:{

    }
});

module.exports= {Notice};
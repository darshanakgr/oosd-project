/**
 * Created by drox2014 on 7/11/2017.
 */
const mongoose = require('mongoose');
const validator= require('validator');

var User = mongoose.model('User', {
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
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    data:{
        type:String,
        required:[true,'More data is required']
    },
    access:{
        type:String,
        required:[true,'Access type is required']
    },
    iD: {
        type: String,
        unique:true,
        minlength: 4
    },
    name: {
        // type: String,
        // trim: true
    },
    batch: {
        // department: {
        //     type: String,
        //     trim: true,
        //     minlength: 1
        // },
        // year: {
        //     type: String,
        //     trim: true,
        //     minlength: 1
        // }
    },
    intended_ID: [{
        // iD:{
        //
        // },
        // read:{
        //     type: Boolean
        // }
    }],
    sent: [{

    }],
    w8nApproval: [{
        // iD: {
        //
        // },
        // read:{
        //     type: Boolean
        // }
    }],
    aD_ID: [{

    }],
    sent_AD: [{

    }],
    w8nApproval_AD:[{
        // iD:{
        //
        // },
        // read:{
        //     type: Boolean
        // }
    }],
    event_ID:[{
        // iD:{
        //
        // },
        // read:{
        //     type: Boolean
        // }
    }],
    sent_Event: [{

    }],
    w8nApproval_Event:[{
        // iD:{
        //
        // },
        // read:{
        //     type: Boolean
        // }
    }]
});

module.exports = {User};

/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');
const validator=require('validator');

const {ObjectID} = require('mongodb').ObjectID;

var User = mongoose.model('User', {
    iD: {
        type: String,
        unique:true,
        minlength: 4
    },
    name: {
        type: String,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid e-mail.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    tokens:[{
        access:{
            type:String
        },token:{
            type:String
        }
    }],
    type: {
        type: String,
        trim: true,
        required:true,
        minlength: 3,

    },
    batch: {
        department: {
            type: String,
            trim: true,
            minlength: 1
        },
        year: {
            type: String,
            trim: true,
            minlength: 1
        }
    },
    intended_ID: [{
        iD:{
            type:ObjectID
        },
        read:{
            type: Boolean
        }
    }],
    sent: [{
        type:ObjectID
    }],
    w8nApproval: [{
        iD:{
            type:ObjectID
        },
        read:{
            type: Boolean
        }
    }],
    aD_ID: [{
        type:ObjectID
    }],
    sent_AD: [{
        type: ObjectID
    }],
    w8nApproval_AD:[{
        iD:{
            type:ObjectID
        },
        read:{
            type: Boolean
        }
    }],
    event_ID:[{
        iD:{
            type:ObjectID
        },
        read:{
            type: Boolean
        }
    }],
    sent_Event: [{
        type: ObjectID
    }],
    w8nApproval_Event:[{
        iD:{
            type:ObjectID
        },
        read:{
            type: Boolean
        }
    }]
});

module.exports= {User};
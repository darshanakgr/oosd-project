/**
 * Created by drox2014 on 7/10/2017.
 */
// var env = process.env.NODE_ENV || "development";
//
// if(env === "development"){
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/NoticeBoard';
// }else if(env === "test"){
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/NoticeBoardTest';
// }

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/NoticeBoardTest');

module.exports = {mongoose};


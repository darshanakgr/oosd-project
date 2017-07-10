/**
 * Created by drox2014 on 7/10/2017.
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/NoticeBoard');

module.exports = {mongoose};


/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {SHA256} = require('crypto-js');
const {User} = require('./../model/user');

const createNewUser = (user) => {
    user.password = SHA256(user.password).toString();
    return new User(user).save();
};

const fundUser = (user) => {
    user.password = SHA256(user.password).toString();
    return User.findOne(user);
};

module.exports = {
    createNewUser,
    fundUser
};
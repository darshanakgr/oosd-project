/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Student} = require('./../model/student');

const registerNewStudent = (student) => {
    return new Student(student).save();
}

module.exports = {
    registerNewStudent
}
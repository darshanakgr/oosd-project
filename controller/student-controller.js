/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Student} = require('./../model/student');

const registerNewStudent = (student) => {
    return new Student(student).save();
};

const searchByIndex = (index) => {
    return Student.findOne({index});
};

const getAllStudents = () => {
    return Student.find();
};



module.exports = {
    registerNewStudent,
    searchByIndex,
    getAllStudents
}
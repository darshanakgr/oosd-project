/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Lecturer} = require('./../model/lecturer');

const registerNewLectuer = (lecturer) => {
    return new Lecturer(lecturer).save();
};

const searchById = (id) => {
    return Lecturer.findById(id);
};

const getAllLecturers = () => {
    return Lecturer.find();
};

module.exports = {
    registerNewLectuer,
    searchById,
    getAllLecturers
}
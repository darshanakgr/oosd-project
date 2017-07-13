/**
 * Created by drox2014 on 7/10/2017.
 */
const {LectureModuleSocket} = require('../socket/lecturer-module-socket');
const {LectureResultSocket} = require('./../socket/lecturer-result-socket');
const {ReceptionStudentSocket} = require('./../socket/reception-student-socket');
const {StudentSocket} = require('./../socket/student-socket');

const getLecturerModuleSocket = (io, socket) => {
    return new LectureModuleSocket(io, socket);
};

const getLecturerResultSocket = (io, socket) => {
    return new LectureResultSocket(io, socket);
};

const getReceptionStudentSocket = (io, socket) => {
    return new ReceptionStudentSocket(io, socket);
};

const getStudentSocket = (io, socket) => {
    return new StudentSocket(io, socket);
};

module.exports = {
    getLecturerModuleSocket,
    getLecturerResultSocket,
    getReceptionStudentSocket,
    getStudentSocket
};
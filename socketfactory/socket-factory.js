/**
 * Created by drox2014 on 7/10/2017.
 */
const {LectureModuleSocket} = require('../socket/lecturer-module-socket');
const {LectureResultSocket} = require('./../socket/lecturer-result-socket');
const {ReceptionStudentSocket} = require('./../socket/reception-student-socket');
const {StudentSocket} = require('./../socket/student-socket');
const {LecturerStatisticSocket} = require('./../socket/lecturer-statistic-socket');
const {ContactDetailSocket} = require('./../socket/contact-detail-socket');
const {ReceptionTimetableSocket} = require('./../socket/reception-timetable-socket');
const {ReceptionLecturerSocket} = require('./../socket/reception-lecturer-socket');

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

const getLecturerStatisticsSocket = (io, socket) => {
    return new LecturerStatisticSocket(io, socket);
};

const getContactDetailSocket = (io, scoket) => {
    return new ContactDetailSocket(io, scoket);
};

const getReceptionTimetableSocket = (io, socket) => {
    return new ReceptionTimetableSocket(io, socket)
};

const getReceptionLecturerSocket = (io, socket) => {
    return new ReceptionLecturerSocket(io, socket);
};

module.exports = {
    getLecturerModuleSocket,
    getLecturerResultSocket,
    getReceptionStudentSocket,
    getStudentSocket,
    getLecturerStatisticsSocket,
    getContactDetailSocket,
    getReceptionTimetableSocket,
    getReceptionLecturerSocket
};
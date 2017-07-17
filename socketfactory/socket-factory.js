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
const {ViewTimetableSocket} = require('./../socket/view-timetable-socket');
const {ReceptionModuleSocket} = require('./../socket/reception-module-socket');
const {MainNoticeSocket} = require('./../socket/main-notice-socket');
const {CreateRegularSocket} = require('./../socket/create-regular-socket');
const {CreateTemporarySocket}= require('./../socket/create-temporary-socket');
const {CreateAdvertisementSocket}= require('./../socket/create-adertisement-socket');
const {CreateEventSocket}= require('./../socket/create-event-socket');
const {EditRegularSocket} = require('./../socket/edit-regular-socket');
const {EditAdvertisementSocket}= require('./../socket/edit-advertisement-socket');
const {EditEventSocket} = require('./../socket/edit-event-socket');
const {UserCreateSocket}= require('./../socket/user-complex-create-socket');
const {LecturerMainSocket}= require('./../socket/lecturer-main-socket');
const {LecturerCreateEventSocket}= require('./../socket/lecturer-create-event-socket');
const {LecturerCreateRegularSocket}= require('./../socket/lecturer-create-regular-socket');
const {LecturerCreateTemporarySocket}= require('./../socket/lecturer-create-temporary-socket');

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

const getViewTimetableSocket = (io, socket) => {
    return new ViewTimetableSocket(io, socket);
};

const getReceptionModuleSocket = (io, socket) => {
    return new ReceptionModuleSocket(io, socket);
};

const getReceptionLecturerSocket = (io, socket) => {
    return new ReceptionLecturerSocket(io, socket);
};

const getMainNoticeSocket = (io, socket) => {
    return new MainNoticeSocket(io, socket);
};

const getCreateRegularSocket = (io, socket) => {
    return new CreateRegularSocket(io, socket);
};

const getCreateTemporarySocket = (io, socket) => {
    return new CreateTemporarySocket(io, socket);
};

const getCreateAdvertisementSocket = (io, socket) => {
    return new CreateAdvertisementSocket(io, socket);
};

const getCreateEventSocket = (io, socket) => {
    return new CreateEventSocket(io, socket);
};

const getEditRegularSocket = (io, socket) => {
    return new EditRegularSocket(io, socket);
};

const getEditAdvertisementSocket = (io, socket) => {
    return new EditAdvertisementSocket(io, socket);
};

const getEditEventSocket = (io, socket) => {
    return new EditEventSocket(io, socket);
};

const getUserCreateSocket = (io, socket) => {
    return new UserCreateSocket(io, socket);
};

const getLecturerMainSocket = (io, socket) => {
    return new LecturerMainSocket(io, socket);
};

const getLecturerCreateEventSocket = (io, socket) => {
    return new LecturerCreateEventSocket(io, socket);
};

const getLecturerCreateRegularSocket = (io, socket) => {
    return new LecturerCreateRegularSocket(io, socket);
};

const getLecturerCreateTemporarySocket = (io, socket) => {
    return new LecturerCreateTemporarySocket(io, socket);
};

module.exports = {
    getLecturerModuleSocket,
    getLecturerResultSocket,
    getReceptionStudentSocket,
    getStudentSocket,
    getLecturerStatisticsSocket,
    getContactDetailSocket,
    getReceptionTimetableSocket,
    getReceptionLecturerSocket,
    getViewTimetableSocket,
    getReceptionModuleSocket,
    getMainNoticeSocket,
    getCreateRegularSocket,
    getCreateTemporarySocket,
    getCreateAdvertisementSocket,
    getCreateEventSocket,
    getEditRegularSocket,
    getEditAdvertisementSocket,
    getEditEventSocket,
    getUserCreateSocket,
    getLecturerMainSocket,
    getLecturerCreateEventSocket,
    getLecturerCreateRegularSocket,
    getLecturerCreateTemporarySocket
};
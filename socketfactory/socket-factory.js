/**
 * Created by drox2014 on 7/10/2017.
 */
const {LectureModuleSocket} = require('./../socket/lecturer-module-socket');
const {LectureResultSocket} = require('./../socket/lecturer-result-socket');

const getLecturerModuleSocket = (io, socket) => {
    return new LectureModuleSocket(io, socket);
};

const getLecturerResultSocket = (io, socket) => {
    return new LectureResultSocket(io, socket);
};

module.exports = {
    getLecturerModuleSocket,
    getLecturerResultSocket
}
/**
 * Created by drox2014 on 7/10/2017.
 */
const {LectureModuleSocket} = require('./../socket/lecturer-module-socket');


var getLecturerModuleSocket = (io, socket) => {
    return new LectureModuleSocket(io, socket);
};

module.exports ={
    getLecturerModuleSocket
}
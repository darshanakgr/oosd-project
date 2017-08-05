/**
 * Created by drox2014 on 7/13/2017.
 */

const lecturerController = require('./../controller/lecturer-controller');
const studentController = require('./../controller/student-controller');
const userController= require('./../controller/user-controller');

class ManageUserSocket {
    constructor(io, socket) {
        console.log('New connection established on /manage-user @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /manage-user @", new Date().getTime());
        });

        socket.on('getAllLecturers', (callback) => {
            lecturerController.getAllLecturers().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getAllStudent', (callback) => {
            studentController.getAllStudents().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('findLecturerById', (id, callback) => {
            lecturerController.searchById(id).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('findStudentByIndex', (id, callback) => {
            studentController.searchByIndex(id).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('createUser', (user, callback) => {
            userController.createNewUser(user).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });
    }
}

module.exports = {ManageUserSocket};
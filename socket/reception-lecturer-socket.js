const lecturerController = require('./../controller/lecturer-controller');
const userController=require('./../controller/lecturer-controller');

class ReceptionLecturerSocket {
    constructor(io, socket) {
        console.log('New connection established on /reception-lecturer @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /reception-lecturer @", new Date().getTime());
        });

        socket.on('registerNewLecturer', (lecturer, callback) => {
            lecturerController.registerNewLectuer(lecturer).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });



        socket.on('getAllLecturers', (callback) => {
            lecturerController.getAllLecturers().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });
    }
}

module.exports = {ReceptionLecturerSocket};
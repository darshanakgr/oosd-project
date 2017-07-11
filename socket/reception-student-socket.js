const batchController = require('./../controller/batch-controller');
const studentController = require('./../controller/student-controller');

class ReceptionStudentSocket {
    constructor(io, socket) {
        console.log('New connection established on /reception-student @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /reception-student @", new Date().getTime());
        });

        socket.on('registerNewBatch', (batch, callback) => {
            batchController.registerNewBatch(batch).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        })

        socket.on('getAllBatches', (callback) => {
            batchController.getAllBatches().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('registerNewStudent', (student, callback) => {
            studentController.registerNewStudent(student).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

    }
}

module.exports.ReceptionStudentSocket = ReceptionStudentSocket;
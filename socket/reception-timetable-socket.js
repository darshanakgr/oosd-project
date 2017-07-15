/**
 * Created by drox2014 on 7/15/2017.
 */

const timetableController = require('./../controller/time-table-controller');
const batchController = require('./../controller/batch-controller');
const lecturerController = require('./../controller/lecturer-controller');

class ReceptionTimetableSocket {
    constructor(io, socket) {
        console.log('New connection established on /reception-timetable @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /reception-timetable @", new Date().getTime());
        });

        socket.on('createSemTimeTable', (timeTable, callback) => {
            timetableController.createNewTimetable(timeTable).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('findTimetable', (timeTable, callback) => {
            timetableController.findTimetable(timeTable).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('updateTimetable', (id, rows, callback) => {
            timetableController.updateTimetable(id, rows).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getAllBatches', (callback) => {
            batchController.getAllBatches().then((res) => {
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

        socket.on('getSemTimeTables', (callback) => {
            timetableController.getSemTimetables().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getLabTimetables', (callback) => {
            timetableController.getLabTimetables().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getLecTimetables', (callback) => {
            timetableController.getLecTimetables().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });
    }

}

module.exports = {ReceptionTimetableSocket};

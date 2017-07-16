/**
 * Created by drox2014 on 7/15/2017.
 */

const timetableController = require('./../controller/time-table-controller');
const batchController = require('./../controller/batch-controller');
const lecturerController = require('./../controller/lecturer-controller');

class ViewTimetableSocket {
    constructor(io, socket) {
        console.log('New connection established on /view-timetable @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /view-timetable @", new Date().getTime());
        });

        socket.on('findTimetable', (timeTable, callback) => {
            timetableController.findTimetable(timeTable).then((res) => {
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
    }

}

module.exports = {ViewTimetableSocket};

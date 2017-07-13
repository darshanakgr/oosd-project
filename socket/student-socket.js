/**
 * Created by drox2014 on 7/13/2017.
 */
const resultController = require('./../controller/result-controller');
const moduleController = require('./../controller/module-controller');


class StudentSocket{
    constructor(io, socket){
        console.log('New connection established on /student-result @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /student-result @", new Date().getTime());
        });

        socket.on('getAllResultById', (studentId, callback) => {
            resultController.searchResultsByStudnetId(studentId).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error)
            });
        });

        socket.on('searchModule', (moduleCode, callback) => {
            moduleController.searchModule(moduleCode).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            })
        });
    }
}

module.exports = {StudentSocket};
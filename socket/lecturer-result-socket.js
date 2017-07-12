const moduleControllr = require('./../controller/module-controller');
const resultControllr = require('./../controller/result-controller');
const moduleDetailController = require('./../controller/module-detail-controller');
const base64 = require('file-base64');
const path = require('path');

class LectureResultSocket {
    constructor(io, socket) {
        console.log('New connection established on /lecturer-result @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-result @", new Date().getTime());
        });

        socket.on('searchModule', (moduleCode, callback) => {
            moduleControllr.searchModule(moduleCode).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            })
        });

        socket.on('uploadResult', (resultHistory, data, callback) => {
            resultControllr.createNewResultHistory(resultHistory).then((res) => {
                resultControllr.addResults(data, resultHistory);
                callback(undefined, res);
            }, (error) => {
                callback(error, undefined);
            });
        });

        socket.on('checkExistence', (data, callback) => {
            resultControllr.checkExistence(data).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error, undefined);
            });
        });

        socket.on('searchByLectureId', (lecturerId, callback)=> {
            moduleDetailController.searchByLectureId(lecturerId).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchModuleDetailById', (id, callback) => {
            moduleDetailController.searchById(id).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });


    }
}

module.exports.LectureResultSocket = LectureResultSocket;
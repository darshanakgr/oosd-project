/**
 * Created by drox2014 on 7/13/2017.
 */

const resultController = require('./../controller/result-controller');
const moduleDetailController = require('./../controller/module-detail-controller');
const moduleController = require('./../controller/module-controller');

class LecturerStatisticSocket{
    constructor(io, socket){
        console.log('New connection established on /lecturer-statistics @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-statistics @", new Date().getTime());
        });

        socket.on('getAllModules', (callback) => {
            resultController.getAllHistories().then((res) => {
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

        socket.on('searchModule', (moduleCode, callback) => {
            moduleController.searchModule(moduleCode).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            })
        });

        socket.on('getResultId', (moduleDetailId, callback) => {
            resultController.searchResultHistoryByModuleDetailId(moduleDetailId).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            })
        });

        socket.on('getResultsByResultId', (resultId, callback) => {
            resultController.searchResultsByHistoryId(resultId).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            })
        });
    }
}

module.exports = {LecturerStatisticSocket};
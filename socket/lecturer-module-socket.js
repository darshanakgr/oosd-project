const moduleController = require('./../controller/module-controller');
const moduleDetailController = require('./../controller/module-detail-controller');
const batchController = require('./../controller/batch-controller');
const resultController = require('./../controller/result-controller');

class LectureModuleSocket{
    constructor(io, socket){
        console.log('New connection established on /lecturer-module @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-module @", new Date().getTime());
        });

        socket.on('createNewModule', (module, callback) => {
            moduleController.createNewModule(module).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('searchModule', (moduleCode, callback) => {
           moduleController.searchModule(moduleCode).then((res) => {
               callback(undefined, res);
           }).catch((error) => {
               callback(error);
           });
        });

        socket.on('updateModule', (moduleCode, module, callback) => {
            moduleController.updateModule(moduleCode, module).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('getAllModules', (callback) => {
            moduleController.getAllModules().then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('createNewModuleDetail', (moduleDetail, callback)=> {
            moduleDetailController.createNewModuleDetail(moduleDetail).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchByLectureId', (lecturerId, callback)=> {
            moduleDetailController.searchByLectureId(lecturerId).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchModuleDetailByLecturerIdAndCode', (moduleDetail, callback)=> {
            moduleDetailController.searchModuleDetailByLecturerIdAndCode(moduleDetail).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getModuleCodes', (callback) => {
            moduleController.getModuleCodes().exec((err, res) => {
                if(err){
                    return callback(err);
                }
                callback(undefined, res);
            });

        });

        socket.on('getAllBatches', (callback) => {
            batchController.getAllBatches().then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('removeModuleDetail', (moduleDetail, callback) => {
            moduleDetailController.removeModuleDetail(moduleDetail).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchResultHistoryByModuleDetailId', (moduleDetailId, callback) => {
            resultController.searchResultHistoryByModuleDetailId(moduleDetailId).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

    }
}

module.exports.LectureModuleSocket = LectureModuleSocket;
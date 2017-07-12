const moduleControlelr = require('./../controller/module-controller');
const moduleDetailControlelr = require('./../controller/module-detail-controller');
const batchController = require('./../controller/batch-controller');

class LectureModuleSocket{
    constructor(io, socket){
        console.log('New connection established on /lecturer-module @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-module @", new Date().getTime());
        });

        socket.on('createNewModule', (module, callback) => {
            moduleControlelr.createNewModule(module).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('searchModule', (moduleCode, callback) => {
           moduleControlelr.searchModule(moduleCode).then((res) => {
               callback(undefined, res);
           }).catch((error) => {
               callback(error);
           });
        });

        socket.on('updateModule', (moduleCode, module, callback) => {
            moduleControlelr.updateModule(moduleCode, module).then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('getAllModules', (callback) => {
            moduleControlelr.getAllModules().then((res) => {
                callback(undefined, res);
            }).catch((error) => {
                callback(error);
            });
        });

        socket.on('createNewModuleDetail', (moduleDetail, callback)=> {
            moduleDetailControlelr.createNewModuleDetail(moduleDetail).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchByLectureId', (lecturerId, callback)=> {
            moduleDetailControlelr.searchByLectureId(lecturerId).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getModuleCodes', (callback) => {
            moduleControlelr.getModuleCodes().exec((err, res) => {
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
            moduleDetailControlelr.removeModuleDetail(moduleDetail).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

    }
}

module.exports.LectureModuleSocket = LectureModuleSocket;
const moduleController = require('./../controller/module-controller');
const moduleDetailController = require('./../controller/module-detail-controller');
const batchController = require('./../controller/batch-controller');
const lecturerController = require('./../controller/lecturer-controller');

class ReceptionModuleSocket{
    constructor(io, socket){
        console.log('New connection established on /reception-module @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /reception-module @", new Date().getTime());
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

        socket.on('getAllEnrollments', ( callback)=> {
            moduleDetailController.getAllEnrollments().then((res) => {
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

        socket.on('searchLecturerById', (id, callback) => {
            lecturerController.searchById(id).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

    }
}

module.exports = {ReceptionModuleSocket};
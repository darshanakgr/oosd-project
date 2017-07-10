/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Modules} = require('./../model/module');

var createNewModule = (module) => {
    return new Promise((resolve, reject) => {
        if(!module){
            reject('Module Not found');
        }
        var newModule = new Modules({
            moduleCode:module.moduleCode,
            moduleName:module.moduleName,
            credits:module.credits,
            batch:module.batch,
            semester:module.semester
        });
        newModule.save().then((doc) => {
            resolve('Moudle saved successfully');
        }, (error) => {
            reject(error.errors);
        });
    });
};

var searchModule = (moduleCode) => {
    return new Promise((resolve, reject) => {
        Modules.findOne({
            moduleCode:moduleCode
        }).then((module) => {
            resolve(module);
        }, (error) => {
            reject(error.errors);
        });
    });
};

var updateModule = (moduleCode, module) => {
    return new Promise((resolve, reject) => {
        Modules.findOneAndUpdate({
            moduleCode:moduleCode
        }, {$set:module}, {new:true}
        ).then((module) => {
            console.log(module);
            resolve(module);
        }, (error) => {
            reject(error.errors);
        });
    });
};

var getAllModules = () => {
    return new Promise((resolve, reject) => {
        Modules.find().then((modules) => {
            resolve(modules);
        }, (error) => {
            reject(error.errors);
        });
    });
}

module.exports = {
    createNewModule,
    searchModule,
    updateModule,
    getAllModules
};
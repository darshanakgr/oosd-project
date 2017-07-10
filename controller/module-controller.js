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
}

module.exports = {
    createNewModule
};
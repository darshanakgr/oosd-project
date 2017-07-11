/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Module} = require('./../model/module');

var createNewModule = (module) => {
    return new Module(module).save();
};

var searchModule = (moduleCode) => {
    return Module.findOne({moduleCode: moduleCode});
};

var updateModule = (moduleCode, module) => {
    return Module.findOneAndUpdate({moduleCode: moduleCode}, {$set: module}, {new: true});
};

var getAllModules = () => {
    return Module.find();
};

var getModuleCodes = () => {
    return new Promise((resolve, reject) => {
        Modules.find().select("moduleCode batch").exec((error, modules) => {
            if (error) {
                reject(error.errors);
            }
            resolve(modules);
        });
    });
};

module.exports = {
    createNewModule,
    searchModule,
    updateModule,
    getAllModules,
    getModuleCodes
};
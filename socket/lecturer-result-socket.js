const moduleControlelr = require('./../controller/module-controller');
const resultControlelr = require('./../controller/result-controller');
const base64 = require('file-base64');
const path = require('path');

class LectureResultSocket {
    constructor(io, socket) {
        console.log('New connection established on /lecturer-result @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /lecturer-result @", new Date().getTime());
        });

        socket.on('getModuleCodes', (callback) => {
            moduleControlelr.getModuleCodes().then((moduleCodes) => {
                callback(moduleCodes);
            }, (error) => {
                callback(error.errors);
            });
        });

        socket.on('searchModule', (moduleCode, callback) => {
            moduleControlelr.searchModule(moduleCode).then((module) => {
                callback(module);
            }).catch((error) => {
                callback(error);
            })
        });

        socket.on('uploadResult', (resultHistory, data, callback) => {
            resultControlelr.createNewResultHistory(resultHistory).then((res) => {
                resultControlelr.addResults(data, resultHistory);

                callback(undefined, res);

            }, (error) => {
                callback(error, undefined);
            });
        });

    }
}

module.exports.LectureResultSocket = LectureResultSocket;
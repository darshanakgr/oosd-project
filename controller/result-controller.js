/**
 * Created by drox2014 on 7/11/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {ResultHistory} = require('./../model/result-history');
const {Result} = require('./../model/result');


const createNewResultHistory = (resultHistory) => {
    return new ResultHistory(resultHistory).save();
};

const addResults = (results, resultHistory) => {
    var resultArr = [];
    results.forEach((result) => {
        resultArr.push(new Result({
            index: result.Index,
            grade: result.Grade,
            moduleCode: resultHistory.moduleCode,
            batch: resultHistory.batch
        }));
    });
    Result.collection.insert(resultArr);
}

const checkExistence = (data) => {
    return ResultHistory.find(data);
}


module.exports = {
    createNewResultHistory,
    addResults,
    checkExistence
}


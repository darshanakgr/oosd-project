/**
 * Created by drox2014 on 7/11/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {ObjectId} = require('mongodb');
const {ResultHistory} = require('./../model/result-history');
const {Result} = require('./../model/result');


const createNewResultHistory = (resultHistory) => {
    return new ResultHistory(resultHistory).save();
};

const addResults = (results, moduleCode, resultId, callback) => {
    var resultArr = [];
    results.forEach((result) => {
        resultArr.push(new Result({
            index: result.Index,
            grade: result.Grade,
            moduleCode: moduleCode,
            resultId: resultId
        }));
    });
    Result.collection.insert(resultArr, callback);
};

const removeResults = (resultId) => {
    return Result.remove({resultId:resultId});
};

const checkExistence = (data) => {
    return ResultHistory.find(data);
};

const updateResultHistory = (resultId, resultHistory) => {
    return ResultHistory.findByIdAndUpdate(resultId,{$set:resultHistory}, {new:true});
};

const searchResultHistoryById = (userId) => {
    return ResultHistory.find({user:userId});
}

const searchResultsByStudnetId = (studentId) => {
    return Result.find({index:studentId});
}

module.exports = {
    createNewResultHistory,
    addResults,
    checkExistence,
    updateResultHistory,
    removeResults,
    searchResultHistoryById,
    searchResultsByStudnetId
}


/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {Batch} = require('./../model/batch');

const registerNewBatch = (batch) => {
    return new Batch(batch).save();
};
const getAllBatches = () => {
    return Batch.find({});
};

module.exports = {
    registerNewBatch,
    getAllBatches
};
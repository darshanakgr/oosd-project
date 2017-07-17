/**
 * Created by drox2014 on 7/16/2017.
 */
const batchController = require('./../controller/batch-controller');
const expect = require('expect');
const {Batch} = require('./../model/batch');

describe('Batch Controller', () => {

    it('Should register new batch', (done) => {
        batchController.registerNewBatch({
            batchName: "BSC15"
        }).then((res) => {
            expect(res).toBeA("object");
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all batches', (done) => {
        batchController.getAllBatches().then((res) => {
            expect(res).toNotBe(null);
            done();
        }, (err) => {
            done(err);
        });
    });

});


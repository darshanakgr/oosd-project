/**
 * Created by drox2014 on 7/16/2017.
 */
const controller = require('./../controller/result-controller');
const {ObjectId} = require('mongodb');

describe('Result Controller', () => {

    it('Should create new Result History', (done) => {
        controller.createNewResultHistory({
            moduleCode:"CS0001",
            moduleDetailId: new ObjectId('596bbc48f4702618c04e1572'),
            date: new Date(),
            user: new ObjectId('596bbc48f4702618c04e1572')
        }).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all result histories', (done) => {
        controller.getAllHistories().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find existing result history by using id', (done) => {
        controller.searchResultHistoryById(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find results of a student', (done) => {
        controller.searchResultsByStudnetId(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });


    it('Should find results of enrolled module', (done) => {
        controller.searchResultHistoryByModuleDetailId(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should remove results', (done) => {
        controller.removeResults(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

});


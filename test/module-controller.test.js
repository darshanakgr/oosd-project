/**
 * Created by drox2014 on 7/16/2017.
 */
const controller = require('./../controller/module-controller');
const {ObjectId} = require('mongodb');

describe('Module Controller', () => {

    it('Should create new Module', (done) => {
        controller.createNewModule({
            moduleCode: "CS001",
            moduleName: "ABC",
            credits: 2.5
        }).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all modules details', (done) => {
        controller.getAllModules().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find existing module\'s detail', (done) => {
        controller.searchModule(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all modules codes', (done) => {
        controller.getModuleCodes().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });


});


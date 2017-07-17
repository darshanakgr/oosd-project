/**
 * Created by drox2014 on 7/16/2017.
 */
const controller = require('./../controller/lecturer-controller');
const {ObjectId} = require('mongodb');

describe('Lecturer Controller', () => {

    it('Should register new lecturer', (done) => {
        controller.registerNewLectuer({
            res: "Mr",
            name: "ABC",
            email: 'drox2014@gmail.com'
        }).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all lecturer\'s details', (done) => {
        controller.getAllLecturers().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find existing lecturer\'s detail', (done) => {
        controller.searchById(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

});


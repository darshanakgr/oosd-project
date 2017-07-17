/**
 * Created by drox2014 on 7/16/2017.
 */
const controller = require('./../controller/module-detail-controller');
const {ObjectId} = require('mongodb');

describe('Module Detail Controller', () => {

    it('Should create new Module Detail', (done) => {
        controller.createNewModuleDetail({
            moduleCode: "CS001",
            lecturerId: new ObjectId('596bbc48f4702618c04e1572'),
            batch: "BSC15",
            semester: 2
        }).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all modules enrollments', (done) => {
        controller.getAllEnrollments().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find existing module detail\'s detail', (done) => {
        controller.searchById(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all modules enrolled by a lecturer', (done) => {
        controller.searchByLectureId(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

});


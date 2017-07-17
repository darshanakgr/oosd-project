/**
 * Created by drox2014 on 7/16/2017.
 */
const controller = require('./../controller/contact-detail-controller');
const {ObjectId} = require('mongodb');

describe('Contact Detail Controller', () => {

    it('Should create new contact detail', (done) => {
        controller.createNewContactDetail({
            res: "Mr",
            name: "ABC",
            designation: "student",
            email: 'drox2014@gmail.com',
            contact: 713344449
        }).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should get all contact detail', (done) => {
        controller.getContactDetails().then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

    it('Should find existing contact detail', (done) => {
        controller.findById(new ObjectId('596bbc48f4702618c04e1572')).then((res) => {
            done();
        }, (err) => {
            done(err);
        });
    });

});


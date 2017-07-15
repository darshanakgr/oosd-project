/**
 * Created by drox2014 on 7/15/2017.
 */
const contactDetailController = require('./../controller/contact-detail-controller');


class ContactDetailSocket{
    constructor(io, socket){
        console.log('New connection established on /contact-detail @', new Date().getTime());

        socket.on('disconnect', () => {
            console.log("Connection was interrupted on /contact-detail @", new Date().getTime());
        });

        socket.on('createNewContactDetail', (contactDetail, callback) => {
            contactDetailController.createNewContactDetail(contactDetail).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('updateContactDetail', (id, contactDetail, callback) => {
            contactDetailController.updateContactDetail(id, contactDetail).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('searchContactDetail', (id, callback) => {
            contactDetailController.findById(id).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('removeContactDetail', (id, callback) => {
            contactDetailController.removeById(id).then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('getContactDetail', (callback) => {
            contactDetailController.getContactDetails().then((res) => {
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });



    }
}

module.exports = {ContactDetailSocket};

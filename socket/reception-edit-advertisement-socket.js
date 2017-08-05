/**
 * Created by Damitha on 7/15/2017.
 */
const userController = require('./../controller/user-controller');

const advertisementController = require('./../controller/advertisement-controller');

class ReceptionEditAdvertisementSocket {
    constructor(io, socket) {
        console.log('Connection established on /reception-edit-advertisement');

        socket.on('disconnect', () => {
            console.log('Connection is interrupted on /reception-edit-advertisement');
        });

        //From User Controller
        //Get user details
        socket.on('getNoticeCreator', (user, callback) => {
            userController.getNoticeUser(user).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //From Advertisement Controller
        //Get notice to edit
        socket.on('getEditAD', (notice,callback) => {
            advertisementController.getFullAdvertisement(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Create Notice
        socket.on('editAD', (notice) => {
            advertisementController.editAdvertisement(notice)
        });
    }
}

module.exports = {ReceptionEditAdvertisementSocket};
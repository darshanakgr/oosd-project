/**
 * Created by Damitha on 7/15/2017.
 */
const userController = require('./../controller/user-controller');

const eventController = require('./../controller/event-controller');

class ReceptionEditEventSocket {
    constructor(io, socket) {
        console.log('Connection established on /reception-edit-event');

        socket.on('disconnect', () => {
            console.log('Connection is interrupted on /reception-edit-event');
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

        //From Event Controller
        //Get notice to edit
        socket.on('getEditEvent', (notice,callback) => {
            eventController.getFullEvent(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Create Notice
        socket.on('editEvent', (notice) => {
            eventController.editEvent(notice)
        });
    }
}

module.exports = {ReceptionEditEventSocket};
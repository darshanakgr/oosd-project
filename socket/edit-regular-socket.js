/**
 * Created by Damitha on 7/15/2017.
 */
const userController = require('./../controller/user-controller');

const noticeController = require('./../controller/notice-controller');

class EditRegularSocket {
    constructor(io, socket) {
        console.log('Connection established on /edit-regular');

        socket.on('disconnect', () => {
            console.log('Connection is interrupted on /create-regular');
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

        //From Notice Controller
        //Get notice to edit
        socket.on('getEditNotice', (notice,callback) => {
            noticeController.getFullNotice(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Create Notice
        socket.on('editNotice', (notice) => {
            noticeController.editNotice(notice)
        });

        socket.on('updateApproveronCreate', (notice) => {
            userController.updateApproveronCreate(notice.trgt,notice.noticeID)
        });
    }
}

module.exports = {EditRegularSocket};
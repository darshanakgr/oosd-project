/**
 * Created by Damitha on 7/15/2017.
 */
const userController = require('./../controller/user-controller');

const noticeController = require('./../controller/notice-controller');

const dropdownController = require('./../controller/dropdown-controller');
const authorityController = require('./../controller/authority-controller');

class CreateTemporarySocket {
    constructor(io, socket) {
        console.log('Connection established on /create-temporary');

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

        //Load all users to list
        socket.on('getAllUsers', (user, callback) => {
            userController.getAllUsers(user).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Load given department to list
        socket.on('getUsersDept', (dept, callback) => {
            userController.getUsersDept(dept).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Load given batch(year) to list
        socket.on('getUsersBatch', (dept, callback) => {
            userController.getUsersBatch(dept).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Load to list via given year and department
        socket.on('getUsersDept&Batch', (dept, callback) => {
            userController.getUsersDeptnBatch(dept).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Get Authorizer
        socket.on('getAuthorizer', (range, callback) => {
            authorityController.getAuthorizer(range).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Create Notice
        socket.on('createTempNotice', (notice,callback) => {
            noticeController.createTempNotice(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //From Dropdown Controller
        //Get list contents
        socket.on('getList', (list, callback) => {
            dropdownController.getList(list).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        socket.on('updateUseronCreate', (notice) => {
            userController.updateUseronCreate(notice.trgt,notice.noticeID)
        });

        socket.on('updateSenderonCreate', (notice) => {
            userController.updateSenderonCreate(notice.trgt,notice.noticeID)
        });

        socket.on('updateApproveronCreate', (notice) => {
            userController.updateApproveronCreate(notice.trgt,notice.noticeID)
        });
    }
}

module.exports = {CreateTemporarySocket};
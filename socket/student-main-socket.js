/**
 * Created by Damitha on 7/14/2017.
 */
const userController = require('./../controller/user-controller');

const noticeController = require('./../controller/notice-controller');
const advertisementController = require('./../controller/advertisement-controller');
const eventController = require('./../controller/event-controller');


class StudentMainSocket {
    constructor(io, socket) {
        console.log('Connection established on /student');

        socket.on('disconnect', () => {
            console.log('Connection is interrupted on /student');
        });


        //From User Controller
        //Get Different Notices lists from user
        socket.on('getNoticeUser', (user, callback) => {
            userController.getNoticeUser(user).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Read a notice in the inbox
        socket.on('readInboxNotice', (user, callback) => {
            userController.readInboxNotice(user).then((res) =>{
                callback(undefined,res);
            }, (error) => {
                callback(error);
            });
        });

        //Read a event in the inbox
        socket.on('readInboxEvent', (user, callback) => {
            userController.readInboxEvent(user).then((res) =>{
                callback(undefined,res);
            }, (error) => {
                callback(error);
            });
        });

        //Read a notice in the Authorization
        socket.on('readAuthNotice', (user, callback) => {
            userController.readAuthNotice(user).then((res) =>{
                callback(undefined,res);
            }, (error) => {
                callback(error);
            });
        });

        //Read a advertisement in the Authorization
        socket.on('readAuthAdvertisement', (user, callback) => {
            userController.readAuthAdvertisement(user).then((res) =>{
                callback(undefined,res);
            }, (error) => {
                callback(error);
            });
        });

        //Read a event in the Authorization
        socket.on('readAuthEvent', (user, callback) => {
            userController.readAuthEvent(user).then((res) =>{
                callback(undefined,res);
            }, (error) => {
                callback(error);
            });
        });





        //From Notice Controller
        //Get Brief Descriptions of Notices for read tracking list
        socket.on('getBriefNoticeWithRead', (notice, callback) => {
            noticeController.getBriefNotice(notice).then((res) =>{
                callback(undefined, {notice:res,read:notice.read});
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Notices for read tracking list
        socket.on('searchBriefNoticeWithRead', (notice, callback) => {
            noticeController.getBriefNoticeSearch(notice).then((res) =>{
                callback(undefined, {notice:res.notice,read:notice.read,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Brief Descriptions of Notices for non read tracking list
        socket.on('getBriefNotice', (notice, callback) => {
            noticeController.getBriefNotice(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Notices for non read tracking list
        socket.on('searchBriefNotice', (notice, callback) => {
            noticeController.getBriefNoticeSearch(notice).then((res) =>{
                callback(undefined, {notice:res.notice,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Detailed Notice
        socket.on('getFullNotice', (notice, callback) => {
            noticeController.getFullNotice(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Approve Notice
        socket.on('approveNotice', (notice) => {
            noticeController.approveNotice(notice)
        });

        //Disapprove Notice
        socket.on('disapproveNotice', (notice) => {
            noticeController.disapproveNotice(notice)
        });

        //Remove Notice
        socket.on('removeNotice', (notice) => {
            noticeController.removeNotice(notice)
        });

        //Check is New
        socket.on('noticeisNew', (notice, callback) => {
            noticeController.noticeisNew(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Check is Approved
        socket.on('noticeisApproved', (notice, callback) => {
            noticeController.noticeisApproved(notice).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });






        //From Advertisement Controller
        //Get Brief Descriptions of Advertisements for read tracking list
        socket.on('getBriefAdvertisementWithRead', (advert, callback) => {
            advertisementController.getBriefAdvertisement(advert).then((res) =>{
                callback(undefined, {aD:res,read:advert.read});
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Advertisements for read tracking list
        socket.on('searchBriefAdvertisementWithRead', (advert, callback) => {
            advertisementController.getBriefAdvertisementSearch(advert).then((res) =>{
                callback(undefined, {aD:res.aD,read:advert.read,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Brief Descriptions of Advertisements for non read tracking list
        socket.on('getBriefAdvertisement', (advert, callback) => {
            advertisementController.getBriefAdvertisement(advert).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Advertisements for non read tracking list
        socket.on('searchBriefAdvertisement', (advert, callback) => {
            advertisementController.getBriefAdvertisementSearch(advert).then((res) =>{
                callback(undefined, {aD:res.aD,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Detailed Advertisement
        socket.on('getFullAdvertisement', (advert, callback) => {
            advertisementController.getFullAdvertisement(advert).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Get Detailed Advertisement with index
        socket.on('getFullAdvertisementwithIndex', (advert, callback) => {
            advertisementController.getFullAdvertisementwithIndex(advert).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Approve AD
        socket.on('approveAD', (advert) => {
            advertisementController.approveAdvertisement(advert)
        });

        //Disapprove AD
        socket.on('disapproveAD', (advert) => {
            advertisementController.disapproveAdvertisement(advert)
        });

        //Remove AD
        socket.on('removeAD', (advert) => {
            advertisementController.removeAdvertisement(advert)
        });

        //Check is New
        socket.on('aDisNew', (advert, callback) => {
            advertisementController.aDisNew(advert).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });



        //From Event Controller
        //Get Brief Descriptions of Events for read tracking list
        socket.on('getBriefEventWithRead', (event, callback) => {
            eventController.getBriefEvent(event).then((res) =>{
                callback(undefined, {event:res,read:event.read});
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Events for read tracking list
        socket.on('searchBriefEventWithRead', (event, callback) => {
            eventController.getBriefEventSearch(event).then((res) =>{
                callback(undefined, {event:res.event,read:event.read,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Brief Descriptions of Events for non read tracking list
        socket.on('getBriefEvent', (event, callback) => {
            eventController.getBriefEvent(event).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Search Brief Descriptions of Events for non read tracking list
        socket.on('searchBriefEvent', (event, callback) => {
            eventController.getBriefEventSearch(event).then((res) =>{
                callback(undefined, {event:res.event,isIn:res.isIn});
            }, (error) => {
                callback(error);
            });
        });

        //Get Detailed Event
        socket.on('getFullEvent', (event, callback) => {
            eventController.getFullEvent(event).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Get Detailed Event with index
        socket.on('getFullEventwithIndex', (event, callback) => {
            eventController.getFullEventwithIndex(event).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Approve Event
        socket.on('approveEvent', (event) => {
            eventController.approveEvent(event)
        });

        //Disapprove Event
        socket.on('disapproveEvent', (event) => {
            eventController.disapproveEvent(event)
        });

        //Disapprove Event
        socket.on('removeEvent', (event) => {
            eventController.removeEvent(event)
        });

        //Check is New
        socket.on('eventisNew', (event, callback) => {
            eventController.eventisNew(event).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });

        //Check is Approved
        socket.on('eventisApproved', (event, callback) => {
            eventController.eventisApproved(event).then((res) =>{
                callback(undefined, res);
            }, (error) => {
                callback(error);
            });
        });


    }
}

module.exports = {StudentMainSocket};

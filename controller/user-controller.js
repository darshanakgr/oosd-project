/**
 * Created by Damitha on 7/14/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {User} = require('./../model/user');
const {ObjectID} = require('mongodb').ObjectID;

const noticeController = require('./../controller/notice-controller');
const advertisementController = require('./../controller/advertisement-controller');
const eventController = require('./../controller/event-controller');

// const authorityController = require('./../controller/authority-controller');

var getNoticeUser = (user) => {
    noticeController.checkForNoticeExpirations();
    eventController.checkForEventExpirations();
    advertisementController.checkForAdvertisementExpirations();
    return User.findOne({iD: user.index});
};

var getAllUsers = (user)=>{
    return User.find().then((res) => {
        return {users:res};
    });
};

var getUsersDept = (dept)=>{
    return User.find({'batch.department': dept}).then((res) => {
        return {users:res};
    });
};

var getUsersBatch = (batch)=>{
    return User.find({'batch.year': batch}).then((res) => {
        return {users:res};
    });
};

var getUsersDeptnBatch = (trgt)=>{
    return User.find({'batch.department': trgt.dept, 'batch.year': trgt.yar}).then((res) => {
        return {users:res};
    });
};

var readInboxNotice= (notice) => {
    return User.findOne({iD: notice.user}).then((docs) => {
        for (var indx = 0; indx < docs.intended_ID.length; ++indx) {
            var notce = docs.intended_ID[indx];
            if ((notce.iD.toString() == notice.iD) && (notce.read.toString() == "true")) {
                User.findOneAndUpdate({
                    iD: notice.user
                }, {
                    $pull: {
                        intended_ID: {iD: ObjectID(notice.iD), read: true}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $push: {
                        intended_ID: {iD: ObjectID(notice.iD), read: false}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
            }
        }
    }, (err) => {
        console.log('Unable to find notice', err);
    });
};

var readInboxEvent = (notice) =>{
    return User.findOne({iD: notice.user}).then((docs) => {
        for (var indx = 0; indx < docs.event_ID.length; ++indx) {
            var notce = docs.event_ID[indx];
            //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
            if ((notce.iD.toString() == ObjectID(notice.iD).toString()) && (notce.read.toString() == "true")) {
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $pull: {
                        event_ID: {iD: ObjectID(notice.iD), read: true}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $push: {
                        event_ID: {iD: ObjectID(notice.iD), read: false}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
            }
        }
    }, (err) => {
        console.log('Unable to find notice', err);
    });
};

var readAuthNotice=(notice)=>{
    return User.findOne({iD: notice.user}).then((docs) => {
        for (var indx = 0; indx < docs.w8nApproval.length; ++indx) {
            var notce = docs.w8nApproval[indx];
            //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
            if ((notce.iD.toString() == ObjectID(notice.iD).toString()) && (notce.read.toString() == "true")) {
                User.findOneAndUpdate({
                    iD: notice.user
                }, {
                    $pull: {
                        w8nApproval: {iD: ObjectID(notice.iD), read: true}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $push: {
                        w8nApproval: {iD: ObjectID(notice.iD), read: false}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
            }
        }
    }, (err) => {
        console.log('Unable to find notice', err);
    });
};

var readAuthAdvertisement = (notice) =>{
    return User.findOne({iD: notice.user}).then((docs) => {
        for (var indx = 0; indx < docs.w8nApproval_AD.length; ++indx) {
            var notce = docs.w8nApproval_AD[indx];
            //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
            if ((notce.iD.toString() == ObjectID(notice.iD).toString()) && (notce.read.toString() == "true")) {
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $pull: {
                        w8nApproval_AD: {iD: ObjectID(notice.iD), read: true}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $push: {
                        w8nApproval_AD: {iD: ObjectID(notice.iD), read: false}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
            }
        }
    }, (err) => {
        console.log('Unable to find notice', err);
    });
};

var readAuthEvent = (notice) =>{
    return User.findOne({iD: notice.user}).then((docs) => {
        for (var indx = 0; indx < docs.w8nApproval_Event.length; ++indx) {
            var notce = docs.w8nApproval_Event[indx];
            //console.log(notce.iD.toString(),ObjectID(notice.iD).toString());
            if ((notce.iD.toString() == ObjectID(notice.iD).toString()) && (notce.read.toString() == "true")) {
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $pull: {
                        w8nApproval_Event: {iD: ObjectID(notice.iD), read: true}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
                User.findOneAndUpdate({
                    iD: notice.user,
                    // 'intended_ID.iD': ObjectID(notice.iD)
                }, {
                    $push: {
                        w8nApproval_Event: {iD: ObjectID(notice.iD), read: false}
                    }
                }, {
                    overwrite: true
                }, (e) => {
                    if (e) {
                        console.log('updateApproveronCreate Error', e);
                    }
                });
            }
        }
    }, (err) => {
        console.log('Unable to find notice', err);
    });
};

var updateUseronCreate = (receivers, noticeID)=>{
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei = receivers[indx1];
        updateSeparteUsers(recei, noticeID);
    }
};

var updateSeparteUsers=(recei, noticeID) =>{
    User.findOneAndUpdate({
        iD: recei
    }, {
        $push: {
            intended_ID: {iD: ObjectID(noticeID), read: true}
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to remove auth notice', e);
        }
    });
};

var updateSenderonCreate=(senderID, noticeID)=> {
    User.findOneAndUpdate({
        iD: senderID
    }, {
        $push: {
            sent: ObjectID(noticeID)
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
};

var updateApproveronCreate=(approverID, noticeID) =>{
    User.findOneAndUpdate({
        iD: approverID
    }, {
        $push: {
            w8nApproval: {iD: ObjectID(noticeID), read: true}
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
};

var updateUseronADCreate=(receivers, noticeID)=> {
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei = receivers[indx1];
        updateADSeparteUsers(recei, noticeID);
    }

};

var updateADSeparteUsers=(recei, noticeID) =>{
    User.findOneAndUpdate({
        iD: recei
    }, {
        $push: {
            aD_ID: ObjectID(noticeID)
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateADSeparteUsers Error', e);
        }
    });
};

var updateSenderonADCreate=(senderID, noticeID)=> {
    //console.log(senderID,ObjectID(noticeID),'updateSenderonCreate');
    User.findOneAndUpdate({
        iD: senderID
    }, {
        $push: {
            sent_AD: ObjectID(noticeID)
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
};

var updateApproveronADCreate=(approverID, noticeID)=> {
    //console.log(approverID,ObjectID(noticeID),'updateApproveronCreate');
    User.findOneAndUpdate({
        iD: approverID
    }, {
        $push: {
            w8nApproval_AD: {iD: ObjectID(noticeID), read: true}
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
};

var updateUseronEventCreate=(receivers, noticeID) =>{
    for (var indx1 = 0; indx1 < receivers.length; ++indx1) {
        var recei = receivers[indx1];
        updateEventSeparteUsers(recei, noticeID);
    }

};

var updateEventSeparteUsers=(recei, noticeID)=> {
    //console.log(recei,ObjectID(noticeID),'updateADSeparteUsers');
    User.findOneAndUpdate({
        iD: recei
    }, {
        $push: {
            event_ID: {iD: ObjectID(noticeID), read: true}
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateADSeparteUsers Error', e);
        }
    });
};

var updateSenderonEventCreate=(senderID, noticeID)=> {
    //console.log(senderID,ObjectID(noticeID),'updateSenderonCreate');
    User.findOneAndUpdate({
        iD: senderID
    }, {
        $push: {
            sent_Event: ObjectID(noticeID)
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateSenderonCreate Error', e);
        }
    });
};

var updateApproveronEventCreate=(approverID, noticeID)=> {
    //console.log(approverID,ObjectID(noticeID),'updateApproveronCreate');
    User.findOneAndUpdate({
        iD: approverID
    }, {
        $push: {
            w8nApproval_Event: {iD: ObjectID(noticeID), read: true}
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('updateApproveronCreate Error', e);
        }
    });
};

module.exports ={
    getNoticeUser,
    readInboxNotice,
    readAuthNotice,
    readAuthAdvertisement,
    readInboxEvent,
    readAuthEvent,
    getAllUsers,
    getUsersDept,
    getUsersBatch,
    getUsersDeptnBatch,
    updateUseronCreate,
    updateSenderonCreate,
    updateApproveronCreate,
    updateUseronADCreate,
    updateSenderonADCreate,
    updateApproveronADCreate,
    updateUseronEventCreate,
    updateSenderonEventCreate,
    updateApproveronEventCreate
};
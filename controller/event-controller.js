/**
 * Created by Damitha on 7/14/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {Event}= require('./../model/event');
const {ObjectID} = require('mongodb').ObjectID;

const userController = require('./../controller/user-controller');

var today;

var getBriefEvent = (event) =>{
    return Event.findOne({_id: event.iD},{'content':0});
};

var getFullEvent = (event) =>{
    return Event.findOne({_id: event.iD});
};

var getFullEventwithIndex = (event) =>{
    return Event.findOne({_id: event.iD}).then((res) => {
        return {content:res.content,indxAD:event.ind}
    });
};

var getBriefEventSearch = (event) => {
    return Event.findOne({_id: event.iD}).then((res) => {
        if(JSON.stringify(res).toLowerCase().search(event.search.toLowerCase())!=-1){
            return {event:res,isIn:true};
        }
        else {
            return {event:res,isIn:false};
        }
    });
};

var createEvent = (newEventNotice) =>{
    var newEvent = new Event({
        title: newEventNotice.title,
        state: "new",
        type: "Event",
        content: newEventNotice.content,
        sender: newEventNotice.sender,
        receivers: newEventNotice.receivers,
        exDate: newEventNotice.exDate
    });
    return newEvent.save().then((doc) => {
        return doc._id;
        // userController.updateUseronEventCreate(newEventNotice.receivers, doc._id);
        // userController.updateSenderonEventCreate(newEventNotice.senderID, doc._id);
        // userController.updateApproveronEventCreate(newEventNotice.approver, doc._id);
    }, (e) => {
        return console.log('Unable to insert - createAD', e);
    });
};

var editEvent=(editRegNotice)=>{
    return Event.findOneAndUpdate({
        _id: ObjectID(editRegNotice.iD)
    }, {
        $set: {
            title: editRegNotice.title,
            content: editRegNotice.content,
            state: "new",
            exDate: editRegNotice.exDate
        }
    }, {
        overwrite: true
    }, (e, doc) => {
        if (e) {
            console.log('Unable to edit notice -EventEdit', e);
        }
    });
};

var checkForEventExpirations=() => {
    var nowDate = Date.parse(new Date());
    if (today != nowDate) {
        today = nowDate;
        Event.find().then((docs) => {
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString() != "NaN") && (today > chDate) && (docs[indx].state != "expired")) {
                    console.log(docs[indx]._id, 'Event');
                    Event.findOneAndUpdate({
                        _id: docs[indx]._id
                    }, {
                        $set: {
                            state: "expired"
                        }
                    }, {
                        overwrite: true
                    }, (e) => {
                        if (e) {
                            console.log('Unable to update notice', e);
                        }
                    });
                }
            }
        }, (err) => {
            console.log('Unable to find expired events', err);
        });
    }
    else {
        console.log("Still the same day");
    }
};

var approveEvent=(notice)=>{
    Event.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "approved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update Event', e);
        }
    });
};

var disapproveEvent=(notice)=>{
    Event.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "disapproved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update Event', e);
        }
    });
};

var removeEvent=(notice)=>{
    Event.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "removed"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update Event', e);
        }
    });
};

var eventisApproved = (event) => {
    return Event.findOne({_id: event.iD}).then((res) => {
        if(res.state=="approved"){
            return true;
        }
        else {
            return false;
        }
    });
};

var eventisNew = (event) => {
    return Event.findOne({_id: event.iD}).then((res) => {
        if(res.state=="New"){
            return true;
        }
        else {
            return false;
        }
    });
};

module.exports ={
    getBriefEvent,
    getFullEvent,
    getBriefEventSearch,
    createEvent,
    editEvent,
    getFullEventwithIndex,
    checkForEventExpirations,
    approveEvent,
    disapproveEvent,
    removeEvent,
    eventisApproved,
    eventisNew
};

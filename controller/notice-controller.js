/**
 * Created by Damitha on 7/14/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {Notice}= require('./../model/notice');
const {ObjectID} = require('mongodb').ObjectID;

const userController = require('./../controller/user-controller');

var today;

var getBriefNotice = (notice) =>{
    return Notice.findOne({_id: notice.iD},{'content':0});
};

var getFullNotice = (notice) =>{
    return Notice.findOne({_id: notice.iD});
};

var getBriefNoticeSearch = (notice) => {
    return Notice.findOne({_id: notice.iD}).then((res) => {
        if(JSON.stringify(res).toLowerCase().search(notice.search.toLowerCase())!=-1){
            return {notice:res,isIn:true};
        }
        else {
            return {notice:res,isIn:false};
        }
    });
};

var createNotice= (newRegNotice) => {
    var newNotice = new Notice({
        title: newRegNotice.title,
        state: "new",
        type: "Notice",
        content: newRegNotice.content,
        sender: newRegNotice.sender,
        receivers: newRegNotice.receivers
    });
     return newNotice.save().then((doc) => {
         return doc._id;
    }, (e) => {
        return console.log('Unable to insert - createNotice', e);
    });
};

var createTempNotice= (newRegNotice) => {
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    var newNotice = new Notice({
        title: newRegNotice.title,
        state: "new",
        type: "Temporary",
        content: newRegNotice.content,
        sender: newRegNotice.sender,
        receivers: newRegNotice.receivers,
        exDate: endDate
    });
    return newNotice.save().then((doc) => {
        return doc._id;
    }, (e) => {
        return console.log('Unable to insert - createNotice', e);
    });
};

var editNotice=(editRegNotice)=>{
    Notice.findOneAndUpdate({
        _id: ObjectID(editRegNotice.iD)
    }, {
        $set: {
            title: editRegNotice.title,
            content: editRegNotice.content,
            state: "new"
        }
    }, {
        overwrite: true
    }, (e, doc) => {
        if (e) {
            console.log('Unable to remove auth notice', e);
        }
    });
};

var checkForNoticeExpirations=() => {
    var nowDate = Date.parse(new Date());
    if (today != nowDate) {
        today = nowDate;
        Notice.find().then((docs) => {
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString() != "NaN") && (today > chDate) && (docs[indx].state != "expired")) {
                    console.log(docs[indx]._id, 'Notice');
                    Notice.findOneAndUpdate({
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
                //console.log(Date.parse(docs[indx].exDate));
            }

        }, (err) => {
            console.log('Unable to find expired notices', err);
        });
    }
    else {
        console.log("Still the same day");
    }
};

var approveNotice=(notice)=>{
    Notice.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "approved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update notice', e);
        }
    });
};

var disapproveNotice=(notice)=>{
    Notice.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "disapproved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update notice', e);
        }
    });
};

var removeNotice=(notice)=>{
    Notice.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "removed"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update notice', e);
        }
    });
};

var noticeisApproved = (notice) => {
    return Notice.findOne({_id: notice.iD}).then((res) => {
        if(res.state=="approved"){
            return true;
        }
        else {
            return false;
        }
    });
};

var noticeisNew = (notice) => {
    return Notice.findOne({_id: notice.iD}).then((res) => {
        if(res.state=="new"){
            return true;
        }
        else {
            return false;
        }
    });
};

module.exports ={
    getBriefNotice,
    getFullNotice,
    getBriefNoticeSearch,
    createNotice,
    createTempNotice,
    editNotice,
    checkForNoticeExpirations,
    approveNotice,
    disapproveNotice,
    removeNotice,
    noticeisApproved,
    noticeisNew
};


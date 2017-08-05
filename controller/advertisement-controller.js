/**
 * Created by Damitha on 7/14/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {Advertisement}= require('./../model/advertisement');
const {ObjectID} = require('mongodb').ObjectID;

const userController = require('./../controller/user-controller');

var today;

var getBriefAdvertisement = (advertisement) =>{
    return Advertisement.findOne({_id: advertisement.iD},{'content':0});
};

var getFullAdvertisement = (advertisement) =>{
    return Advertisement.findOne({_id: advertisement.iD});
};

var getFullAdvertisementwithIndex = (advertisement) =>{
    return Advertisement.findOne({_id: advertisement.iD}).then((res) => {
        return {content:res.content,indxAD:advertisement.ind}
    });
};

var getBriefAdvertisementSearch = (advertisement) => {
    return Advertisement.findOne({_id: advertisement.iD}).then((res) => {
        if(JSON.stringify(res).toLowerCase().search(advertisement.search.toLowerCase())!=-1){
            return {aD:res,isIn:true};
        }
        else {
            return {aD:res,isIn:false};
        }
    });
};

var createAdvertisement= (newADNotice) => {
    var newAD = new Advertisement({
        title: newADNotice.title,
        state: "new",
        type: "Advertisement",
        content: newADNotice.content,
        sender: newADNotice.sender,
        receivers: newADNotice.receivers,
        exDate: newADNotice.exDate
    });
    return newAD.save().then((doc) => {
        return doc._id
    }, (e) => {
        return console.log('Unable to insert - createAD', e);
    });
};

var editAdvertisement=(editRegNotice)=>{
    Advertisement.findOneAndUpdate({
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
            console.log('Unable to remove auth notice', e);
        }
    });
};

var checkForAdvertisementExpirations=() => {
    var nowDate = Date.parse(new Date());
    if (today != nowDate) {
        today = nowDate;
        Advertisement.find().then((docs) => {
            for (var indx = 0; indx < docs.length; ++indx) {
                var chDate = Date.parse(docs[indx].exDate);
                if ((chDate.toString() != "NaN") && (today > chDate) && (docs[indx].state != "expired")) {
                    console.log(docs[indx]._id, 'AD');
                    Advertisement.findOneAndUpdate({
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
            console.log('Unable to find expired advertisements', err);
        });
    }
    else {
        console.log("Still the same day");
    }
};

var approveAdvertisement=(notice)=>{
    Advertisement.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "approved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update AD', e);
        }
    });
};

var disapproveAdvertisement=(notice)=>{
    Advertisement.findOneAndUpdate({
        _id: ObjectID(notice.iD)
    }, {
        $set: {
            state: "disapproved"
        }
    }, {
        overwrite: true
    }, (e) => {
        if (e) {
            console.log('Unable to update AD', e);
        }
    });
};

var removeAdvertisement=(notice)=>{
    Advertisement.findOneAndUpdate({
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

var aDisApproved = (advertisement) => {
    return Advertisement.findOne({_id: advertisement.iD}).then((res) => {
        if(res.state=="approved"){
            return true;
        }
        else {
            return false;
        }
    });
};

var aDisNew = (advertisement) => {
    return Advertisement.findOne({_id: advertisement.iD}).then((res) => {
        if(res.state=="new"){
            return true;
        }
        else {
            return false;
        }
    });
};

module.exports ={
    getBriefAdvertisement,
    getFullAdvertisement,
    getBriefAdvertisementSearch,
    createAdvertisement,
    editAdvertisement,
    getFullAdvertisementwithIndex,
    checkForAdvertisementExpirations,
    approveAdvertisement,
    disapproveAdvertisement,
    removeAdvertisement,
    aDisApproved,
    aDisNew
};

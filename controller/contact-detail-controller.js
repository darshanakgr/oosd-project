/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {ContactDetail} = require('./../model/contact-detail');

const createNewContactDetail = (contactDetail) => {
    return new ContactDetail(contactDetail).save();
};

const updateContactDetail = (id, contactDetail) => {
    return ContactDetail.findByIdAndUpdate(id, {$set:contactDetail}, {new:true});
};

const getContactDetails = () => {
    return ContactDetail.find();
};

const findById = (id) => {
    return ContactDetail.findById(id);
};

const removeById = (id) => {
    return ContactDetail.remove({_id:id});
};

module.exports = {
    createNewContactDetail,
    getContactDetails,
    findById,
    updateContactDetail,
    removeById
};
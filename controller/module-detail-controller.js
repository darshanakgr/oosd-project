/**
 * Created by drox2014 on 7/10/2017.
 */
const {mongoose} = require('./../db/mongoose');
const {ModuleDetail} = require('./../model/module-detail');

var createNewModuleDetail = (moduleDetail) => {
    return new ModuleDetail(moduleDetail).save();
};

var searchByLectureId = (lecturerId) => {
    return ModuleDetail.find({lecturerId});
};

var removeModuleDetail = (moduleDetail) => {
    return ModuleDetail.findOneAndRemove(moduleDetail);
}

var searchById = (id) => {
    return ModuleDetail.findById(id);
}

var searchModuleDetailByLecturerIdAndCode = (moduleDetail) => {
    return ModuleDetail.findOne(moduleDetail);
};

module.exports = {
    createNewModuleDetail,
    searchByLectureId,
    removeModuleDetail,
    searchById,
    searchModuleDetailByLecturerIdAndCode
}
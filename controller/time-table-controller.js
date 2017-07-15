/**
 * Created by drox2014 on 7/15/2017.
 */

const {mongoose} = require('./../db/mongoose');
const {Timetable} = require('./../model/time-table');

const createNewTimetable = (timetable) => {
    return new Timetable(timetable).save();
};

const getSemTimetables = () => {
    return Timetable.find({timetableType:"SEM"});
};

const getLabTimetables = () => {
    return Timetable.find({timetableType:"LAB"});
};

const getLecTimetables = () => {
    return Timetable.find({timetableType:"LEC"});
};

const findTimetable = (timetable) => {
    return Timetable.findOne(timetable);
};

const updateTimetable = (id, rows) => {
    return Timetable.findByIdAndUpdate(id, {$set:rows}, {new:true});
};

module.exports = {
    createNewTimetable,
    getSemTimetables,
    getLabTimetables,
    getLecTimetables,
    findTimetable,
    updateTimetable
};


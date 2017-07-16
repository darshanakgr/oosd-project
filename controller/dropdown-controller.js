/**
 * Created by Damitha on 7/15/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {Dropdown}= require('./../model/dropdown');

var getList = (list) =>{
    return Dropdown.findOne({iD: list.iD});
};

module.exports ={
    getList
}
/**
 * Created by Damitha on 7/15/2017.
 */
const {mongoose} = require('./../db/mongoose');

const {Authority}= require('./../model/authority');

var getAuthorizer = (range) =>{
    return Authority.findOne({range:range});
};

module.exports ={
    getAuthorizer
}
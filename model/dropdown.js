/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');

var Dropdown = mongoose.model('Dropdowns', {
    iD: {
        type: String
    },
    department: {},
    year: {}
});


module.exports= {Dropdown};
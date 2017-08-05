/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');

var Authority = mongoose.model('Authority', {
    range: {
        type: String
    },
    authorizer: {
        type: String
    }
});

module.exports= {Authority};
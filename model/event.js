/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');

var Event = mongoose.model('Event', {
    title: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        default: "new"
    },
    content: {},
    sender: {},
    receivers: {},
    exDate: {},
    type: {}
});

module.exports= {Event};

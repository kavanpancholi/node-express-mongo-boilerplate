/*!
 * Module dependencies
 */
 var moment = require('moment');

/**
 * User transformer
 */

var transform = function(req) {
    return {
        "id" : req._id,
        "first_name" : req.first_name,
        "last_name" : req.last_name,
        "email" : req.email,
        "dob" : moment(req.dob).format('DD-MM-YYYY'),
    };
}

module.exports = transform;

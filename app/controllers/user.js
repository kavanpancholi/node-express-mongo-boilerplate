/*!
 * Module dependencies.
 */
const indicative = require('indicative');
const User = require('../models/user');
const UserTransformer = require('../transformers/user');

// Validation rules
const rules = {
    first_name: 'required',
    last_name: 'required',
    email: 'required|email',
    dob: 'required|date'
}

exports.index = function(req, res) {
    User.find({}, function(err, users) {
        console.log(users);
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = UserTransformer(user);
        })
        res.json(userMap);
    });
};

exports.create = function(req, res) {
    indicative.validate(req.body, rules)
        .then(function() {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) return handleError(err);
                res.json('Successfully registered a new user');
            });
        })
        .catch(function(errors) {
            res.json(errors);
        })
};

exports.show = function(req, res) {
    User.find({ "_id": req.params.id }, function(err, users) {
        if (err) {
            return res.status(404).send('User not found');
        }
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = UserTransformer(user);
        })
        res.json(userMap);
    });
};

exports.update = function(req, res) {
    indicative.validate(req.body, rules)
        .then(function() {
            User.findById(req.params.id, function(err, user) {
                if (!user) {
                    return res.status(404).send('User not found');
                } else {
                    user.first_name = req.body.first_name || user.first_name;
                    user.last_name = req.body.last_name || user.last_name;
                    user.email = req.body.email || user.email;
                    user.dob = req.body.dob || user.dob;
                    user.save(function(err) {
                        if (err) return handleError(err);
                        res.json('Successfully updated user');
                    });
                }
            });
        })
        .catch(function(errors) {
            res.json(errors);
        });
};

exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            return res.status(404).send('User not found');
        }
        var response = {
	        message: "User successfully deleted",
	        id: user._id
	    };
	    res.send(response);
    });
};

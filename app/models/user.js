var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(model.get('pass_word'), salt, function(err, hash) {
          console.log('Stored password hash: ', hash);
          model.set('pass_word', hash);
        });
      });
    });
  }
});

module.exports = User;
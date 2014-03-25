var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      bcrypt.hash(model.get('password'), function(err, hash) {
        console.log('Stored password hash: ', hash);
        model.set('password', hash);
      });
    });
  }
});

module.exports = User;
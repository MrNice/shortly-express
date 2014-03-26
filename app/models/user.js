var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

bcrypt = Promise.promisifyAll(bcrypt);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.createHash);
  },
  createHash: function(model, attrs, options) {
    bcrypt.hashAsync(model.get('password'), null, null)
    .then(function(err, hash) {
      if(err) throw err;
      console.log('Stored password hash: ', hash);
      model.set('password', hash);
    });
  },
  comparePass: function(attempt) {
    bcrypt.compare(attempt, this.get('username'), function(err, res) {
    // res == true
    }).then(function(err, res){
      return res;
    });
  }
});

module.exports = User;
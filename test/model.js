/**
 * Module dependencies
 */

var model = require("../"),
    expect = require('expect.js');

/**
 * Initialize `User`
 */

var User = model('User')
    .attr('id', { type: 'number' })
    .attr('name', { type: 'string', defaultValue: "Bobby" })
    .attr('age', { type: 'number' });

/**
 * Test model
 */

describe('model(name)', function() {
  it('returns a new model constructor', function(){
    var Something = model('Something');
    expect(Something).to.be.a('function');
  });
});

describe('new Model(attrs)', function() {
  it('populates the attrs', function() {
    var user = new User({name: 'Tobi', age: 22});
    expect(user.name()).to.equal('Tobi');
    expect(user.age()).to.equal(22);
  });

  it('sets the default values', function() {
    var user = new User();
    expect(user.name()).to.equal('Bobby');
  });

  it('emits the initialize event', function(done) {
    User.once('initialize', function(passedUser) {
      expect(passedUser).to.be.a(User);
      done();
    });
    var user = new User();
  });
});

describe('Model(attrs)', function() {
  it('populates the attrs', function() {
    var user = User({name: 'Tobi', age: 22});
    expect(user.name()).to.equal('Tobi');
    expect(user.age()).to.equal(22);
  });

  it('sets the default values', function() {
    var user = User();
    expect(user.name()).to.equal('Bobby');
  });

  it('emits the initialize event', function(done) {
    User.once('initialize', function(passedUser) {
      expect(passedUser).to.be.a(User);
      done();
    });
    var user = User();
  });

  it('includes the initial params in the initialize event', function(done) {
    User.once('initialize', function(passedUser, params) {
      expect(params).to.eql(initialParams);
      done();
    });
    var initialParams = {
      name: 'tobi',
      age: 22
    }
    var user = User(initialParams);
  });

});

describe('new Model([attrs])', function() {
  it("returns an array of Models", function() {
    var users = new User([{name: 'Bobby'}, {name: 'Tobi'}]);
    expect(users[0].name()).to.be('Bobby');
    expect(users[1].name()).to.be('Tobi');
  });
});

describe('Model([attrs])', function() {
  it("returns an array of Models", function() {
    var users = User([{name: 'Bobby'}, {name: 'Tobi'}]);
    expect(users[0].name()).to.be('Bobby');
    expect(users[1].name()).to.be('Tobi');
  });
});

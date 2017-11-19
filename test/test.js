var assert = require('assert');
var fuzz = require('../index');

/*

3:30 is 3:30
15:00 is 3pm
4pm is 4pm
4.4 is 4 hours and 24 minutes
*/
describe('Simple Input Time Matching', function() {
  it('##:## should convert to approprate format', function() {
    assert.equal(fuzz('3:30'), '3:30');
  });
  it('am and pm work', function() {
    assert.equal(fuzz('3:30pm'), '15:30');
    assert.equal(fuzz('3:30am'), '3:30');
    assert.equal(fuzz('3:30PM'), '15:30');
    assert.equal(fuzz('3:30P.M.'), '15:30');
    assert.equal(fuzz('3:30p.m.'), '15:30');
    assert.equal(fuzz('3:30p.M.'), '15:30');
    assert.equal(fuzz('3:30pM'), '15:30');
  });
  it('military time works', function() {
    assert.equal(fuzz('15:00'), '15:00');
  });
  it('invalid times return null', function() {
    assert.equal(fuzz('24:30pm'), null);
  });
  it('decimals', function() {
    assert.equal(fuzz('4.4'), '4:24');
  });
  it('errors', function() {
    assert.equal(fuzz(''),null);
    assert.equal(fuzz(null),null);
  });
  it('only hours', function() {
    assert.equal(fuzz('7p'),'19:00');
    assert.equal(fuzz('7a'),'7:00');
    assert.equal(fuzz('7'),'7:00');
  });
  it('only minutes', function() {
    assert.equal(fuzz('30'),'0:30');
    assert.equal(fuzz('10m'),'0:10');
    assert.equal(fuzz('10'),'10:00');
  });
});
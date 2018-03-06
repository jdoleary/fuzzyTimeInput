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
    assert.equal(fuzz('8pm'), '20:00');
    assert.equal(fuzz('8p'), '20:00');
    assert.equal(fuzz('8am'), '8:00');
    assert.equal(fuzz('11am'), '11:00');
    assert.equal(fuzz('11pm'), '23:00');
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
  it('weird entries', function() {
    assert.equal(fuzz('15:00p'),'15:00');
    assert.equal(fuzz('15:'),'15:00');
    assert.equal(fuzz(':15'),'0:15');
    assert.equal(fuzz('03:15p'),'15:15');
  });
  
  it('return type', function() {
    assert.equal(fuzz('3:12',),'3:12');
    assert.equal(fuzz('3:12','string'),'3:12');
    assert.equal(fuzz('3:12','json').hours,3);
    assert.equal(fuzz('3:12','json').minutes,12);
  });

  it('four/three number format works', function() {
    assert.equal(fuzz('1200',),'12:00');
    assert.equal(fuzz('1513',),'15:13');
    assert.equal(fuzz('300',),'3:00');
    assert.equal(fuzz('312p',),'15:12');
  });
});
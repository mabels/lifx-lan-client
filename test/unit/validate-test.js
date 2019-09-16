'use strict';

const validation = require('../../').validation;
const assert = require('chai').assert;

suite('Validation', () => {
  test('isUIntRange', () => {
    const test1 = validation.isUIntRange();
    assert.isString(test1);
    assert.equal(test1, test1.match(/^[0-9A-F]{8}$/)[0]);

    const test2 = utils.getRandomHexString(16);
    assert.isString(test2);
    assert.equal(test2, test2.match(/^[0-9A-F]{16}$/)[0]);
  });

  test('isUInt8', () => {
    const test2 = validation.isUIntRange();
    assert.isString(test2);
  });

  test('isUInt16', () => {
    const test2 = validation.isUIntRange();
    assert.isString(test2);
  });

  test('isUInt32', () => {
    const test2 = validation.isUIntRange();
    assert.isString(test2);
  });


});

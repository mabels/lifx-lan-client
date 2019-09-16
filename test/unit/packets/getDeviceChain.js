'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

suite('Packet getDeviceChain', () => {
  suite('create', () => {
    test('getDeviceChain', () => {
      const packet = Packet.create('getDeviceChain');
      assert.equal(packet.size, 0);
      assert.equal(packet.level, 0);
      assert.equal(packet.type, 117);
    });
  });
});

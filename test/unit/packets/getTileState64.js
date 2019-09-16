'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

suite('Packet getTileState64', () => {
  suite('create', () => {
    test('getTileState64', () => {
      const packet = Packet.create('getTileState64', {
        tileIndex: 4,
        length: 4,
        reserved: 4,
        x: 4,
        y: 4,
        width: 4,
      });
      assert.equal(packet.size, 0);
      assert.equal(packet.level, 0);
      assert.equal(packet.type, 117);
    });
  });
});

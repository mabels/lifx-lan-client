'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

suite('Packet setTileState64', () => {
  suite('create', () => {
    test('setTileState64', () => {
      const packet = Packet.create('setTileState64', {
        tileIndex: 4,
        length: 4,
        reserved: 4,
        x: 4,
        y: 4,
        width: 4,
        duration: 4,
        colors: [
          {
            hue: 49
          }
        ]
      });
      assert.equal(packet.size, 0);
      assert.equal(packet.level, 0);
      assert.equal(packet.type, 117);
    });
  });
});

'use strict';

const Packet = require('../../../lib/lifx').packet;
const assert = require('chai').assert;

suite('Packet stateDeviceChain', () => {
  suite('create', () => {
    test('stateDeviceChain', () => {
      const packet = Packet.toBuffer('stateDeviceChain', {
        startIndex: 4,
        tileDevices: [

        ],
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

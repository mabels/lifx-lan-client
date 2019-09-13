'use strict';

/**
 * Searches for new lights, if one is found it sends a setWaveform packet
 * which tells the light to pulse to red and back three times over a period of 800ms
 */

const LifxClient = require('../lib/lifx').Client;

const client = new LifxClient();

// Function running when packet was received by light
const callback = function() {
  console.log('Packet send\n');
};

function getBits(light, idx, chain) {
  if (idx >= chain.total_count) {
    console.log('All Bits get');
    setTimeout(() => setBits(light, 0, chain), 1000);
    return;
  }
  light.getTileState64(idx, 64, 0, 0, 8, function(err, msg) {
    console.log('GET', msg);
    getBits(light, idx + 1, chain);
  });
}

function setBits(light, idx, chain) {
  if (idx >= chain.total_count) {
    console.log('All Bits set');
    getBits(light, 0, chain);
    // setTimeout(() => setBits(light, 0, chain), 1000);
    return;
  }
  console.log('idx', idx);
  const ofs = ~~(Math.random() * (65536 - 65536/64));
  light.setTileState64(idx, 64, 0, 0, 8, 100, (new Array(64))
    .fill(undefined).map((_, idx) => ({
      hue: (ofs + (idx * 65536/64)) & 0xffff,
      saturation: 50000,
      brightness: 16384,
      kelvin: 4096,
    })), function() {
      setBits(light, idx + 1, chain);
    });
}

client.on('light-new', function(light) {
  console.log('New light found.');
  console.log('ID: ' + light.id);


  light.getHardwareVersion(function(err, info) {
    if (err) {
      console.log(err);
    }
    console.log('Device Info: ' + info.vendorName + ' - ' + info.productName);
    console.log('Features: ', info.productFeatures, '\n');
  });

  light.getDeviceChain(function(err, chain) {
    if (err) {
      console.log(err);
    }
    setBits(light, 0, chain);
  });

  // Set the light id
  // packetObj.target = light.id; // set target id to new light
  // console.log(light); 
});

// Give feedback when running
client.on('listening', function() {
  const address = client.address();
  console.log(
    'Started LIFX listening on ' +
    address.address + ':' + address.port + '\n'
  );
});

client.init();

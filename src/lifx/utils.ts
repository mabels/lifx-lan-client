import * as os from "os";
import { HSBK } from "./packets/hsbk";
import { BufferStream } from './packets/buffer-stream';
// import productDetailList from './products.json';
// import { HSBK } from './packet/hsbk';
// const os = require('os');
// const {constants} = require('../lifx');
// const productDetailList = require('./products.json');
// const utils = exports;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HsbColor {
  h: number;
  s: number;
  b: number;
}

/**
 * Return all ip addresses of the machine
 * @return {Array} list containing ip address info
 */
export function getHostIPs() {
  const ips: string[] = [];
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function(ifname) {
    ifaces[ifname].forEach(function(iface) {
      ips.push(iface.address);
    });
  });
  return ips;
}

/**
 * Generates a random hex string of the given length
 * @example
 * // returns something like 8AF1
 * utils.getRandomHexString(4)
 * @example
 * // returns something like 0D41C8AF
 * utils.getRandomHexString()
 * @param  {Number} [length=8] string length to generate
 * @return {String}            random hex string
 */
export function getRandomHexString(length: number) {
  let string = "";
  const chars = "0123456789ABCDEF";

  if (!length) {
    length = 8;
  }

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    string += chars.substring(randomNumber, randomNumber + 1);
  }

  return string;
}



/**
 * Writes a 64-bit value provided as buffer and returns the result
 * This function exists for easy replacing if a native method will be provided
 * by node.js and does not make sense like is
 * @param  {Buffer} buffer buffer to write from
 * @param  {Number} offset offset to begin reading from
 * @param  {Buffer} input  the buffer to write
 * @return {Buffer}        resulting 64-bit buffer
 */
export function writeUInt64LE(buffer: Buffer, offset: number, input: Buffer) {
  return input.copy(buffer, offset, 0, 8);
}

/**
 * Validates a given ip address is IPv4 format
 * @param  {String} ip IP address to validate
 * @return {Boolean}   is IPv4 format?
 */
export function isIpv4Format(ip: string) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Regex.test(ip);
}

/**
 * set any val to a number by the given default
 * @param {any} val given value
 * @param {Number} def given default
 * @return {Number} the 16bit number
 */
export function to16Bitnumber(val: number | undefined, def: number) {
  if (typeof val !== "number") {
    if (typeof def === "number") {
      val = def;
    } else {
      val = 0;
    }
  }
  if (val < 0) {
    val = -1 * val + 0x10000;
  }
  return val & 0xffff;
}

/**
 * Checks validity of color to be an HSBK Value
 * This updates HSBK to defaults
 * @param {Object} color value
 * @param {Number} color.hue value
 * @param {Number} color.saturation value
 * @param {Number} color.brightness value
 * @param {Number} color.kelvin value
 * @return {Object} HSBK value
 */
export function toColorHsbk(color: Partial<HSBK>) {
  if (typeof color !== "object") {
    throw new TypeError("LIFX util toColorHsbk expects colors to be an object");
  }
  return {
    hue: to16Bitnumber(color.hue, 0x8000),
    saturation: to16Bitnumber(color.saturation, 0x8000),
    brightness: to16Bitnumber(color.brightness, 0x8000),
    kelvin: to16Bitnumber(color.kelvin, constants.HSBK_DEFAULT_KELVIN)
  };
}

/**
 * Checks validity of colors array containing HSBK
 * This updates HSBK values to defaults
 * @param {array} colors of HSBK values
 * @param {Number} size if set array has to have size
 * @return {array} colors array by the given size
 */
export function buildColorsHsbk(colors: HSBK[], size: number) {
  if (!Array.isArray(colors)) {
    throw new TypeError(
      "LIFX util buildColorsHsbk expects colors to be an array"
    );
  }
  if (typeof size !== "number") {
    size = 0;
  }
  return Array<unknown>(size)
    .fill(undefined)
    .map((_: unknown, idx: number) => toColorHsbk(colors[idx] || {}));
}

/**
 * Converts an RGB Hex string to an object with decimal representations
 * @example rgbHexStringToObject('#FF00FF')
 * @param {String} rgbHexString hex value to parse, with leading #
 * @return {Object}             object with decimal values for r, g, b
 */
function rgbHexStringToObject(rgbHexString: string) {
  if (typeof rgbHexString !== "string") {
    throw new TypeError(
      "LIFX util rgbHexStringToObject expects first parameter to be a string"
    );
  }
  const hashChar = rgbHexString.substr(0, 1);
  if (hashChar !== "#") {
    throw new RangeError(
      "LIFX util rgbHexStringToObject expects hex parameter with leading '#' sign"
    );
  }
  const pureHex = rgbHexString.substr(1);
  if (pureHex.length !== 6 && pureHex.length !== 3) {
    throw new RangeError(
      "LIFX util rgbHexStringToObject expects hex value parameter to be 3 or 6 chars long"
    );
  }

  let r: string = '0';
  let g: string = '0';
  let b: string = '0';

  if (pureHex.length === 6) {
    r = pureHex.substring(0, 2);
    g = pureHex.substring(2, 4);
    b = pureHex.substring(4, 6);
  } else if (pureHex.length === 3) {
    r = pureHex.substring(0, 1);
    r += r;
    g = pureHex.substring(1, 2);
    g += g;
    b = pureHex.substring(2, 3);
    b += b;
  }

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16)
  };
}

/**
 * find mininum number in an array
 * @param {Array} array of numbers
 * @return {Number} minium of the given array
 */
export function minNumberInArray(array: number[]) {
  return Math.min(...array);
}

/**
 * find maxinum number in an array
 * @param {Array} array of numbers
 * @return {Number} maxinum of the given array
 */
export function maxNumberInArray(array: number[]) {
  return Math.max(...array);
}

/**
 * Converts an object with r,g,b integer values to an
 * hsb integer object
 * @param {Object} rgbObj object with r,g,b keys and values
 * @return {Object} hsbObj object with h,s,b keys and converted values
 */
export function rgbToHsb(rgbObj: RgbColor) {
  const red = rgbObj.r / constants.RGB_MAXIMUM_VALUE;
  const green = rgbObj.g / constants.RGB_MAXIMUM_VALUE;
  const blue = rgbObj.b / constants.RGB_MAXIMUM_VALUE;
  const rgb = [red, green, blue];
  const hsb: Partial<HsbColor> = {};

  const max = utils.maxNumberInArray(rgb);
  const min = utils.minNumberInArray(rgb);
  const c = max - min;

  // https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
  let hue: number;
  if (c === 0) {
    hue = 0;
  } else if (max === red) {
    hue = (green - blue) / c;
    if (hue < 0) {
      hue += 6;
    }
  } else if (max === green) {
    hue = 2 + (blue - red) / c;
  } else {
    // max === blue
    hue = 4 + (red - green) / c;
  }
  hsb.h = Math.round(60 * hue);

  // https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
  const lightness = max;
  hsb.b = Math.round(lightness * 100);

  // https://en.wikipedia.org/wiki/HSL_and_HSV#Saturation
  let saturation;
  if (c === 0) {
    saturation = 0;
  } else {
    saturation = c / lightness;
  }
  hsb.s = Math.round(saturation * 100);

  return hsb;
}

/**
 * Get's product and vendor details for the given id's
 * hsb integer object
 * @param {Number} vendorId id of the vendor
 * @param {Number} productId id of the product
 * @return {Object|Boolean} product and details vendor details or false if not found
 */
// export function getHardwareDetails(vendorId, productId) {
//   for (let i = 0; i < productDetailList.length; i += 1) {
//     if (productDetailList[i].vid === vendorId) {
//       for (let j = 0; j < productDetailList[i].products.length; j += 1) {
//         if (productDetailList[i].products[j].pid === productId) {
//           return {
//             vendorName: productDetailList[i].name,
//             productName: productDetailList[i].products[j].name,
//             productFeatures: productDetailList[i].products[j].features
//           };
//         }
//       }
//     }
//   }

//   return false;
// }

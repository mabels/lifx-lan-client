import { format } from "util";
import { HighLow } from './packets/buffer-stream';

/**
 * Formats error message and throws a TypeError
 * @param {String} message Error message
 * @param {String} context Validation context
 * @param {String} [parameter] Validated parameter name
 */
export function throwTypeError(message: string, context: string, parameter: unknown[] = []) {
  throw new TypeError(format(message, context, parameter));
}

/**
 * Formats the error message and throws a RangeError
 * @param {String} message Error message
 * @param {String} context Validation context
 * @param {String} [parameter] Validated parameter name
 */
export function throwRangeError(message: string, context: string, parameter: unknown[] = []) {
  throw new RangeError(format(message, context, parameter));
}

/**
 * Checks validity of given color hue, saturation and brightness values
 * @param {any} hue value to validate
 * @param {any} saturation value to validate
 * @param {any} brightness brightness value to validate
 * @param {String} context validation context
 */
export function colorHsb(hue: number, saturation: number, brightness: number, context: string) {
  const hueMessage =
    "LIFX %s expects hue to be a number between " +
    constants.HSBK_MINIMUM_HUE +
    " and " +
    constants.HSBK_MAXIMUM_HUE;
  if (typeof hue !== "number") {
    throwTypeError(hueMessage, context);
  } else if (
    hue < constants.HSBK_MINIMUM_HUE ||
    hue > constants.HSBK_MAXIMUM_HUE
  ) {
    throwRangeError(hueMessage, context);
  }

  const saturationMessage =
    "LIFX %s expects saturation to be a number between " +
    constants.HSBK_MINIMUM_SATURATION +
    " and " +
    constants.HSBK_MAXIMUM_SATURATION;
  if (typeof saturation !== "number") {
    throwTypeError(saturationMessage, context);
  } else if (
    saturation < constants.HSBK_MINIMUM_SATURATION ||
    saturation > constants.HSBK_MAXIMUM_SATURATION
  ) {
    throwRangeError(saturationMessage, context);
  }

  const brightnessMessage =
    "LIFX %s expects brightness to be a number between " +
    constants.HSBK_MINIMUM_BRIGHTNESS +
    " and " +
    constants.HSBK_MAXIMUM_BRIGHTNESS;
  if (typeof brightness !== "number") {
    throwTypeError(brightnessMessage, context);
  } else if (
    brightness < constants.HSBK_MINIMUM_BRIGHTNESS ||
    brightness > constants.HSBK_MAXIMUM_BRIGHTNESS
  ) {
    throwRangeError(brightnessMessage, context);
  }
}

/**
 * Checks validity of color RGB values
 * @param {any} red Red value to validate
 * @param {any} green Green value to validate
 * @param {any} blue Blue value to validate
 * @param {String} context validation context
 */
export function colorRgb(red: number, green: number, blue: number, context: string) {
  if (typeof red !== "number") {
    throwTypeError("LIFX %s expects first parameter red to a number", context);
  }
  if (red < constants.RGB_MINIMUM_VALUE || red > constants.RGB_MAXIMUM_VALUE) {
    throwRangeError(
      "LIFX %s expects first parameter red to be between 0 and 255",
      context
    );
  }
  if (typeof green !== "number") {
    throwTypeError(
      "LIFX %s expects second parameter green to a number",
      context
    );
  }
  if (
    green < constants.RGB_MINIMUM_VALUE ||
    green > constants.RGB_MAXIMUM_VALUE
  ) {
    throwRangeError(
      "LIFX %s expects second parameter green to be between 0 and 255",
      context
    );
  }
  if (typeof blue !== "number") {
    throwTypeError("LIFX %s expects third parameter blue to a number", context);
  }
  if (
    blue < constants.RGB_MINIMUM_VALUE ||
    blue > constants.RGB_MAXIMUM_VALUE
  ) {
    throw new RangeError(
      "LIFX light colorRgb method expects third parameter blue to be between 0 and 255"
    );
  }
}

/**
 * Checks validity of IR brightness
 * @param {any} brightness IR brightness to validate
 * @param {String} context validation context
 */
export function irBrightness(brightness: number, context: string) {
  if (
    typeof brightness !== "number" ||
    brightness < constants.IR_MINIMUM_BRIGHTNESS ||
    brightness > constants.IR_MAXIMUM_BRIGHTNESS
  ) {
    throwRangeError(
      "LIFX %s expects brightness to be a number between " +
        constants.IR_MINIMUM_BRIGHTNESS +
        " and " +
        constants.IR_MAXIMUM_BRIGHTNESS,
      context
    );
  }
}

/**
 * Checks validity of an optional kelvin value
 * @param {any} kelvin Kelvin value to validate
 * @param {String} context validation context
 */
export function optionalKelvin(kelvin: number|undefined, context: string) {
  if (kelvin !== undefined) {
    const message = `LIFX %s expects kelvin to be a number between ${constants.HSBK_MINIMUM_KELVIN} and ${constants.HSBK_MAXIMUM_KELVIN}`;
    if (typeof kelvin !== "number") {
      throwTypeError(message, context);
    } else if (
      kelvin < constants.HSBK_MINIMUM_KELVIN ||
      kelvin > constants.HSBK_MAXIMUM_KELVIN
    ) {
      throwRangeError(message, context);
    }
  }
}

/**
 * Checks validity of an optional transition time
 * @param {any} duration Transition time to validate
 * @param {String} context validation context
 */
export function optionalDuration(duration: number, context: string) {
  if (duration !== undefined && typeof duration !== "number") {
    throwTypeError("LIFX %s expects duration to be a number", context);
  }
}

/**
 * Checks validity of a callback function
 * @param {any} callback Callback to validate
 * @param {String} context validation context
 */
export function callback(callback: Function, context: string) {
  if (typeof callback !== "function") {
    throwTypeError("LIFX %s expects callback to be a function", context);
  }
}

/**
 * Checks validity of an optional callback function
 * @param {any} callback Callback to validate
 * @param {String} context validation context
 */
export function optionalCallback(callback: Function, context: string) {
  if (callback !== undefined && typeof callback !== "function") {
    throwTypeError("LIFX %s expects callback to be a function", context);
  }
}

/**
 * Checks validity of an optional boolean
 * @param {any} value value to validate
 * @param {any} parameter validated parameter name
 * @param {String} context validation context
 */
export function optionalBoolean(value: boolean, parameter: unknown, context: string) {
  if (value !== undefined && typeof value !== "boolean") {
    throwTypeError('LIFX %s expects "%s" to be a boolean', context, [parameter]);
  }
}

/**
 * Checks validity of a light zone index
 * @param {any} index Light zone index to validate
 * @param {String} context validation context
 */
export function zoneIndex(index: number, context: string) {
  const zoneMessage =
    "LIFX %s expects zone to be a number between " +
    constants.ZONE_INDEX_MINIMUM_VALUE +
    " and " +
    constants.ZONE_INDEX_MAXIMUM_VALUE;
  if (typeof index !== "number") {
    throwTypeError(zoneMessage, context);
  } else if (
    index < constants.ZONE_INDEX_MINIMUM_VALUE ||
    index > constants.ZONE_INDEX_MAXIMUM_VALUE
  ) {
    throwRangeError(zoneMessage, context);
  }
}

/**
 * Checks validity of an optional light zone index
 * @param {any} index Light zone index to validate
 * @param {String} context validation context
 * @return {Boolean} const true or an exception
 */
export function optionalZoneIndex(index: number, context: string) {
  const zoneMessage =
    "LIFX %s expects zone to be a number between " +
    constants.ZONE_INDEX_MINIMUM_VALUE +
    " and " +
    constants.ZONE_INDEX_MAXIMUM_VALUE;
  if (index !== undefined) {
    if (typeof index !== "number") {
      throwTypeError(zoneMessage, context);
    } else if (
      index < constants.ZONE_INDEX_MINIMUM_VALUE ||
      index > constants.ZONE_INDEX_MAXIMUM_VALUE
    ) {
      throwRangeError(zoneMessage, context);
    }
  }
  return true;
}

/**
 * Checks validity the userX and userY
 * @param {Number} x the x value
 * @param {Number} y the y value
 * @param {String} context validation context
 * @param {String} valueName prepended to the output
 * @return {Boolean} const true or an exception
 */
export function isXY(x: number, y: number, context: string, valueName: string) {
  validate.isUInt8(x, context, (valueName || "") + "X");
  validate.isUInt8(y, context, (valueName || "") + "Y");
  return true;
}

/**
 * test if the given value is an uint value
 * @param {Boolean} val the given uint value as number
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isBoolean(val: unknown, context: string) {
  if (typeof val !== "boolean") {
    throw new TypeError(context);
  }
  return true;
}


/**
 * test if the given value is an uint value
 * @param {Number} val the given uint value as number
 * @param {String} context the string for the error message
 * @param {Number} range the range of the uint value
 * @return {Boolean} const true or an exception
 */
export function isUIntRange(val: unknown, context: string, range: number) {
  if (typeof val !== "number") {
    throwTypeError('LIFX %s expects "%s" to be a number', context, [val]);
    return;
  }
  if (!(val >= 0 && val <= range)) {
    throw new RangeError(
      `LIFX ${context} expects "${val}" to be a number between 0 and ${range}`
    );
  }
  return true;
}

/**
 * test if the given value is an uint8 value
 * @param {Number} val the given uint8 value as number
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isUInt8(val: unknown, context: string) {
  return isUIntRange(val, context, 0xff);
}

/**
 * test if the given value is an uint16 value
 * @param {Number} val the given uint16 value as number
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isUInt16(val: unknown, context: string) {
  return isUIntRange(val, context, 0xffff);
}

/**
 * test if the given value is an uint32 value
 * @param {Number} val the given uint32 value as number
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isUInt32(val: unknown, context: string) {
  return isUIntRange(val, context, 0xffffffff);
}

/**
 * @typedef {Object} UInt64LowHigh
 * @property {Number} low - UInt16 accelMeasX
 * @property {Number} high - UInt16 accelMeasX
 */
/**
 * test if the given value is an uint32 value
 * @param {UInt64LowHigh} val the given uint64 as low,high object
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isUInt64LowHigh(val: HighLow,  context: string) {
  if (typeof val !== "object") {
    throwTypeError('LIFX %s expects "%s" to be an object', context, [val]);
  }
  isUInt32(val.low, context);
  isUInt32(val.high, context);
  return true;
}

/**
 * test if the given value is an float value
 * @param {Number} val the given float value as number
 * @param {String} context the string for the error message
 * @return {Boolean} const true or an exception
 */
export function isFloat(val: unknown, context: string) {
  if (typeof val !== "number") {
    throwTypeError('LIFX %s expects "%s" to be a float', context, [val]);
  }
  return true;
}

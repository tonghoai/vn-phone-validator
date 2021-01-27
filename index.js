'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prefixOperator;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VIETNAMOBILE = 'vietnamobile';
var VIETTEL = 'viettel';
var VINAPHONE = 'vinaphone';
var MOBIPHONE = 'mobiphone';
var GMOBILE = 'gmobile';
var ITELECOM = 'itelecom';

var viettelPrefix = ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'];
var mobiphonePrefix = ['89', '90', '93', '70', '79', '77', '76', '78'];
var vinaphonePrefix = ['88', '91', '94', '83', '84', '85', '81', '82'];
var vietnamobilePrefix = ['92', '56', '58'];
var gmobilePrefix = ['99', '59'];
var itelecomPrefix = ['87'];
var allPrefix = [].concat(viettelPrefix, mobiphonePrefix, vinaphonePrefix, vietnamobilePrefix, gmobilePrefix, itelecomPrefix);

var prefixOperator = (_prefixOperator = {}, _defineProperty(_prefixOperator, VIETNAMOBILE, vietnamobilePrefix), _defineProperty(_prefixOperator, VIETTEL, viettelPrefix), _defineProperty(_prefixOperator, VINAPHONE, vinaphonePrefix), _defineProperty(_prefixOperator, MOBIPHONE, mobiphonePrefix), _defineProperty(_prefixOperator, GMOBILE, gmobilePrefix), _defineProperty(_prefixOperator, ITELECOM, itelecomPrefix), _prefixOperator);

var PhoneValidate = function () {
  function PhoneValidate(phoneNumber) {
    _classCallCheck(this, PhoneValidate);

    this.phoneNumber = phoneNumber;
    this.purePhoneNumber = phoneNumber;
    this.code = '';
    this.prefix = '';
    this.number = '';
    this.isValidate = false;
  }

  _createClass(PhoneValidate, [{
    key: 'analysisPhone',
    value: function analysisPhone() {
      var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.purePhoneNumber = phoneNumber;
      this.phoneNumber = phoneNumber.replace(/((?!^)\+|\s|\.)/g, '');
      var reg = /((084|0|84|\+84)(\d{2})(\d{7}))/;
      var parse = this.phoneNumber.match(reg);
      if (!parse) return false;
      if (parse[0].length !== this.phoneNumber.length) return false;

      this.code = parse[2];
      this.prefix = parse[3];
      this.number = parse[4];

      if (!allPrefix.includes(this.prefix)) return false;
      return true;
    }
  }, {
    key: 'validateStrict',
    value: function validateStrict() {
      var replaceSpecialPhoneNumber = this.purePhoneNumber.replace(/((?!^)\+|\D)/g, '');
      return this.purePhoneNumber === replaceSpecialPhoneNumber;
    }
  }, {
    key: 'validateFormat',
    value: function validateFormat(formatSchema) {
      var formatSchemaRegex = new RegExp(formatSchema.replace(/x/g, '\\d'));
      return formatSchemaRegex.test(this.purePhoneNumber);
    }
  }, {
    key: 'validateOperator',
    value: function validateOperator(operators) {
      var currentPrefixOperators = operators.reduce(function (acc, c) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(prefixOperator[c] ? prefixOperator[c] : [])), [];
      });
      return currentPrefixOperators.includes(this.prefix);
    }
  }, {
    key: 'validate',
    value: function validate() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var strict = options.strict,
          format = options.format,
          operator = options.operator;

      this.isValidate = this.analysisPhone(this.phoneNumber);
      if (strict) this.isValidate = this.validateStrict();
      if (format) this.isValidate = this.validateFormat(format);
      if (operator) this.isValidate = this.validateOperator(operators);
      return this.isValidate;
    }
  }, {
    key: 'operator',
    value: function operator() {
      if (!this.analysisPhone(this.phoneNumber)) return null;
      if (viettelPrefix.includes(this.prefix)) return VIETTEL;else if (vietnamobilePrefix.includes(this.prefix)) return VIETNAMOBILE;else if (vinaphonePrefix.includes(this.prefix)) return VINAPHONE;else if (mobiphonePrefix.includes(this.prefix)) return MOBIPHONE;else if (gmobilePrefix.includes(this.prefix)) return GMOBILE;else if (itelecomPrefix.includes(this.prefix)) return ITELECOM;else return '';
    }
  }, {
    key: 'hidden',
    value: function hidden(num, character) {
      if (!this.analysisPhone(this.phoneNumber)) return null;
      var regString = '.{' + num + '}$';
      var reg = new RegExp(regString);
      var characterFill = new Array(num).fill(character).join('');
      return this.phoneNumber.replace(reg, characterFill);
    }
  }, {
    key: 'format',
    value: function format(schemaString) {
      if (!this.analysisPhone(this.phoneNumber)) return null;
      var newArrayPhoneAfterFormat = [];
      var currentFormatToReverseArray = [].concat(_toConsumableArray(schemaString)).reverse();
      var currentPhoneNumberToArray = [].concat(_toConsumableArray(this.phoneNumber));
      for (var i = 0; i < currentFormatToReverseArray.length; i++) {
        if (currentFormatToReverseArray[i] === 'x') {
          newArrayPhoneAfterFormat.push(currentPhoneNumberToArray.pop());
        } else {
          newArrayPhoneAfterFormat.push(currentFormatToReverseArray[i]);
        }
      }

      return newArrayPhoneAfterFormat.reverse().join('');
    }
  }]);

  return PhoneValidate;
}();

module.exports = function (phoneNumber) {
  var phoneValidate = new PhoneValidate(phoneNumber);
  return phoneValidate;
};
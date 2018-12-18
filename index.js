'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VIETNAMOBILE = 'vietnamobile';
var VIETTEL = 'viettel';
var VINAPHONE = 'vinaphone';
var MOBIPHONE = 'mobiphone';
var GMOBILE = 'gmobile';

var viettelPrefix = ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'];
var mobiphonePrefix = ['89', '90', '93', '70', '79', '77', '76', '78'];
var vinaphonePrefix = ['88', '91', '94', '83', '84', '85', '81', '82'];
var vietnamobilePrefix = ['92', '56', '58'];
var gmobilePrefix = ['99', '59'];

function phoneValidate() {
    this.phoneNumber = '';
    this.isValidate = false;
    this.prefix = '';
}

function getPrefix(phoneNumber) {
    var prefix = '';
    var fourFirstNumber = phoneNumber.toString().substring(0, 4);
    if (fourFirstNumber.indexOf('84') === 0) {
        prefix = fourFirstNumber.substring(2, 5);
    } else if (fourFirstNumber.indexOf('0') == 0) {
        prefix = fourFirstNumber.substring(1, 3);
    }
    return prefix;
}

function validatePhoneNumber(phoneNumber) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var strict = options.strict,
        format = options.format,
        operator = options.operator;

    var allPrefix = [].concat(viettelPrefix, mobiphonePrefix, vinaphonePrefix, vietnamobilePrefix, gmobilePrefix);
    if (operator && (typeof operator === 'undefined' ? 'undefined' : _typeof(operator)) === 'object' && operator.length) {
        allPrefix = getOptionPrefix(operator);
    }
    if (format && typeof format === 'string') {
        return validatePhoneNumberWithFormat(phoneNumber, format);
    }
    var victimPhoneNumber = strict ? phoneNumber.toString() : phoneNumber.toString().replace(/ /g, '');
    switch (victimPhoneNumber.length) {
        case 10:
            {
                for (var i = 0; i < allPrefix.length; i++) {
                    if (victimPhoneNumber.indexOf('0' + allPrefix[i]) === 0) {
                        return true;
                    }
                }
                return false;
            }
        case 11:
            {
                if (victimPhoneNumber.indexOf('84') === 0) {
                    for (var _i = 0; _i < allPrefix.length; _i++) {
                        if (victimPhoneNumber.indexOf('84' + allPrefix[_i]) === 0) {
                            return true;
                        }
                    }
                }
                return false;
            }
        default:
            {
                return false;
            }
    }
}

function validatePhoneNumberWithFormat(phoneNumber, format) {
    var victimNumberFormatToArray = [].concat(_toConsumableArray(format.toString()));
    var victimPhoneNumberToArray = [].concat(_toConsumableArray(phoneNumber.toString()));
    if (victimNumberFormatToArray.length !== victimPhoneNumberToArray.length) return false;

    for (var i = 0; i < victimNumberFormatToArray.length; i++) {
        var currentNumberFormat = victimNumberFormatToArray[i];
        var currentNumberPhone = victimPhoneNumberToArray[i];
        if (!Number.isNaN(Number(currentNumberFormat))) {
            if (currentNumberFormat !== currentNumberPhone) return false;
        }
    }

    return true;
}

function getOptionPrefix(prefixs) {
    var currentAllPrefix = [];
    for (var i = 0; i < prefixs.length; i++) {
        switch (prefixs[i]) {
            case VIETTEL:
                {
                    currentAllPrefix = [].concat(_toConsumableArray(currentAllPrefix), viettelPrefix);
                    break;
                }
            case MOBIPHONE:
                {
                    currentAllPrefix = [].concat(_toConsumableArray(currentAllPrefix), mobiphonePrefix);
                    break;
                }
            case VINAPHONE:
                {
                    currentAllPrefix = [].concat(_toConsumableArray(currentAllPrefix), vinaphonePrefix);
                    break;
                }
            case VIETNAMOBILE:
                {
                    currentAllPrefix = [].concat(_toConsumableArray(currentAllPrefix), vietnamobilePrefix);
                    break;
                }
            case GMOBILE:
                {
                    currentAllPrefix = [].concat(_toConsumableArray(currentAllPrefix), gmobilePrefix);
                    break;
                }
        }
    }
    return currentAllPrefix;
}

function returnPrefix(phoneNumber) {
    var prefixName = '';
    var prefix = getPrefix(phoneNumber);
    if (viettelPrefix.indexOf(prefix) !== -1) {
        prefixName = VIETTEL;
    } else if (mobiphonePrefix.indexOf(prefix) !== -1) {
        prefixName = MOBIPHONE;
    } else if (vinaphonePrefix.indexOf(prefix) !== -1) {
        prefixName = VINAPHONE;
    } else if (vietnamobilePrefix.indexOf(prefix) !== -1) {
        prefixName = VIETNAMOBILE;
    } else if (gmobilePrefix.indexOf(prefix) !== -1) {
        prefixName = GMOBILE;
    }
    return prefixName;
}

function hiddenPhoneNumber(phoneNumber, number, char) {
    var currentNumber = number || 3;
    var currentChar = char || '*';
    var hiddenPhoneNumber = phoneNumber.substring(0, phoneNumber.length - Number(currentNumber)) + Array(Number(currentNumber)).fill(currentChar).join('');
    return hiddenPhoneNumber;
}

phoneValidate.prototype.validate = function (phoneNumber) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.phoneNumber = phoneNumber;
    this.isValidate = validatePhoneNumber(phoneNumber, options);
    return this;
};

phoneValidate.prototype.operator = function () {
    if (!this.isValidate) {
        return false;
    }
    var operator = returnPrefix(this.phoneNumber);
    return operator;
};

phoneValidate.prototype.hidden = function (number, char) {
    if (!this.isValidate) {
        return false;
    }
    var hidden = hiddenPhoneNumber(this.phoneNumber, number, char);
    return hidden;
};

module.exports = new phoneValidate();
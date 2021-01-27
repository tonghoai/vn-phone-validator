const VIETNAMOBILE = 'vietnamobile';
const VIETTEL = 'viettel';
const VINAPHONE = 'vinaphone';
const MOBIPHONE = 'mobiphone';
const GMOBILE = 'gmobile';
const ITELECOM = 'itelecom';

const viettelPrefix = ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'];
const mobiphonePrefix = ['89', '90', '93', '70', '79', '77', '76', '78'];
const vinaphonePrefix = ['88', '91', '94', '83', '84', '85', '81', '82'];
const vietnamobilePrefix = ['92', '56', '58'];
const gmobilePrefix = ['99', '59'];
const itelecomPrefix = ['87'];
const allPrefix = [...viettelPrefix, ...mobiphonePrefix, ...vinaphonePrefix, ...vietnamobilePrefix, ...gmobilePrefix, ...itelecomPrefix];

const prefixOperator = {
  [VIETNAMOBILE]: vietnamobilePrefix,
  [VIETTEL]: viettelPrefix,
  [VINAPHONE]: vinaphonePrefix,
  [MOBIPHONE]: mobiphonePrefix,
  [GMOBILE]: gmobilePrefix,
  [ITELECOM]: itelecomPrefix,
};

class PhoneValidate {
  constructor(phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.purePhoneNumber = phoneNumber;
    this.code = '';
    this.prefix = '';
    this.number = '';
    this.isValidate = false;
  }

  analysisPhone(phoneNumber = '') {
    this.purePhoneNumber = phoneNumber;
    this.phoneNumber = phoneNumber.replace(/((?!^)\+|\s|\.)/g, '');
    const reg = /((084|0|84|\+84)(\d{2})(\d{7}))/;
    const parse = this.phoneNumber.match(reg);
    if (!parse) return false;
    if (parse[0].length !== this.phoneNumber.length) return false;

    this.code = parse[2];
    this.prefix = parse[3];
    this.number = parse[4];

    if (!allPrefix.includes(this.prefix)) return false;
    return true;
  }

  validateStrict() {
    const replaceSpecialPhoneNumber = this.purePhoneNumber.replace(/((?!^)\+|\D)/g, '');
    return this.purePhoneNumber === replaceSpecialPhoneNumber;
  }

  validateFormat(formatSchema) {
    const formatSchemaRegex = new RegExp(formatSchema.replace(/x/g, '\\d'));
    return formatSchemaRegex.test(this.purePhoneNumber);
  }

  validateOperator(operators) {
    const currentPrefixOperators = operators.reduce((acc, c) => ([...acc, ...(prefixOperator[c] ? prefixOperator[c] : [])], []));
    return currentPrefixOperators.includes(this.prefix);
  }

  validate(options = {}) {
    const { strict, format, operator } = options;
    this.isValidate = this.analysisPhone(this.phoneNumber);
    if (strict) this.isValidate = this.validateStrict();
    if (format) this.isValidate = this.validateFormat(format);
    if (operator) this.isValidate = this.validateOperator(operators);
    return this.isValidate;
  }

  operator() {
    if (!this.analysisPhone(this.phoneNumber)) return null;
    if (viettelPrefix.includes(this.prefix)) return VIETTEL;
    else if (vietnamobilePrefix.includes(this.prefix)) return VIETNAMOBILE;
    else if (vinaphonePrefix.includes(this.prefix)) return VINAPHONE;
    else if (mobiphonePrefix.includes(this.prefix)) return MOBIPHONE;
    else if (gmobilePrefix.includes(this.prefix)) return GMOBILE;
    else if (itelecomPrefix.includes(this.prefix)) return ITELECOM;
    else return '';
  }

  hidden(num, character) {
    if (!this.analysisPhone(this.phoneNumber)) return null;
    const regString = `.{${num}}$`;
    const reg = new RegExp(regString);
    const characterFill = new Array(num).fill(character).join('');
    return this.phoneNumber.replace(reg, characterFill);
  }

  format(schemaString) {
    if (!this.analysisPhone(this.phoneNumber)) return null;
    let newArrayPhoneAfterFormat = [];
    const currentFormatToReverseArray = [...schemaString].reverse();
    const currentPhoneNumberToArray = [...this.phoneNumber];
    for (let i = 0; i < currentFormatToReverseArray.length; i++) {
      if (currentFormatToReverseArray[i] === 'x') {
        newArrayPhoneAfterFormat.push(currentPhoneNumberToArray.pop());
      } else {
        newArrayPhoneAfterFormat.push(currentFormatToReverseArray[i]);
      }
    }

    return newArrayPhoneAfterFormat.reverse().join('');
  }
}

module.exports = (phoneNumber) => {
  const phoneValidate = new PhoneValidate(phoneNumber);
  return phoneValidate;
};
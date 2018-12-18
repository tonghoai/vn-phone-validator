const VIETNAMOBILE = 'vietnamobile'
const VIETTEL = 'viettel'
const VINAPHONE = 'vinaphone'
const MOBIPHONE = 'mobiphone'
const GMOBILE = 'gmobile'

const viettelPrefix = ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39']
const mobiphonePrefix = ['89', '90', '93', '70', '79', '77', '76', '78']
const vinaphonePrefix = ['88', '91', '94', '83', '84', '85', '81', '82']
const vietnamobilePrefix = ['92', '56', '58']
const gmobilePrefix = ['99', '59']

function phoneValidate() {
    this.phoneNumber = ''
    this.isValidate = false
    this.prefix = ''
}

function getPrefix(phoneNumber) {
    let prefix = ''
    const fourFirstNumber = phoneNumber.toString().substring(0, 4)
    if (fourFirstNumber.indexOf('84') === 0) {
        prefix = fourFirstNumber.substring(2, 5)
    } else if (fourFirstNumber.indexOf('0') == 0) {
        prefix = fourFirstNumber.substring(1, 3)
    }
    return prefix
}

function validatePhoneNumber(phoneNumber, options = {}) {
    const { strict, format, operator } = options
    let allPrefix = [...viettelPrefix, ...mobiphonePrefix, ...vinaphonePrefix, ...vietnamobilePrefix, ...gmobilePrefix]
    if (operator && typeof (operator) === 'object' && operator.length) {
        allPrefix = getOptionPrefix(operator)
    }
    if (format && typeof (format) === 'string') {
        return validatePhoneNumberWithFormat(phoneNumber, format)
    }
    const victimPhoneNumber = strict ? phoneNumber.toString() : phoneNumber.toString().replace(/ /g, '')
    switch (victimPhoneNumber.length) {
        case 10: {
            for (let i = 0; i < allPrefix.length; i++) {
                if (victimPhoneNumber.indexOf(`0${allPrefix[i]}`) === 0) {
                    return true
                }
            }
            return false
        }
        case 11: {
            if (victimPhoneNumber.indexOf('84') === 0) {
                for (let i = 0; i < allPrefix.length; i++) {
                    if (victimPhoneNumber.indexOf(`84${allPrefix[i]}`) === 0) {
                        return true
                    }
                }
            }
            return false
        }
        default: {
            return false
        }
    }
}

function validatePhoneNumberWithFormat(phoneNumber, format) {
    const victimNumberFormatToArray = [...format.toString()]
    const victimPhoneNumberToArray = [...phoneNumber.toString()]
    if (victimNumberFormatToArray.length !== victimPhoneNumberToArray.length)
        return false

    for (let i = 0; i < victimNumberFormatToArray.length; i++) {
        const currentNumberFormat = victimNumberFormatToArray[i]
        const currentNumberPhone = victimPhoneNumberToArray[i]
        if (!Number.isNaN(Number(currentNumberFormat))) {
            if (currentNumberFormat !== currentNumberPhone)
                return false
        }
    }

    return true
}

function getOptionPrefix(prefixs) {
    let currentAllPrefix = []
    for (let i = 0; i < prefixs.length; i++) {
        switch (prefixs[i]) {
            case VIETTEL: {
                currentAllPrefix = [...currentAllPrefix, ...viettelPrefix]
                break
            }
            case MOBIPHONE: {
                currentAllPrefix = [...currentAllPrefix, ...mobiphonePrefix]
                break
            }
            case VINAPHONE: {
                currentAllPrefix = [...currentAllPrefix, ...vinaphonePrefix]
                break
            }
            case VIETNAMOBILE: {
                currentAllPrefix = [...currentAllPrefix, ...vietnamobilePrefix]
                break
            }
            case GMOBILE: {
                currentAllPrefix = [...currentAllPrefix, ...gmobilePrefix]
                break
            }
        }
    }
    return currentAllPrefix
}

function returnPrefix(phoneNumber) {
    let prefixName = ''
    const prefix = getPrefix(phoneNumber)
    if (viettelPrefix.indexOf(prefix) !== -1) {
        prefixName = VIETTEL
    } else if (mobiphonePrefix.indexOf(prefix) !== -1) {
        prefixName = MOBIPHONE
    } else if (vinaphonePrefix.indexOf(prefix) !== -1) {
        prefixName = VINAPHONE
    } else if (vietnamobilePrefix.indexOf(prefix) !== -1) {
        prefixName = VIETNAMOBILE
    } else if (gmobilePrefix.indexOf(prefix) !== -1) {
        prefixName = GMOBILE
    }
    return prefixName
}

function hiddenPhoneNumber(phoneNumber, number, char) {
    const currentNumber = number || 3
    const currentChar = char || '*'
    const hiddenPhoneNumber = phoneNumber.substring(0, phoneNumber.length - Number(currentNumber)) + Array(Number(currentNumber)).fill(currentChar).join('')
    return hiddenPhoneNumber
}

phoneValidate.prototype.validate = function (phoneNumber, options = {}) {
    this.phoneNumber = phoneNumber
    this.isValidate = validatePhoneNumber(phoneNumber, options)
    return this
}

phoneValidate.prototype.operator = function () {
    if (!this.isValidate) {
        return false
    }
    const operator = returnPrefix(this.phoneNumber)
    return operator
}

phoneValidate.prototype.hidden = function (number, char) {
    if (!this.isValidate) {
        return false
    }
    const hidden = hiddenPhoneNumber(this.phoneNumber, number, char)
    return hidden
}

module.exports = new phoneValidate()
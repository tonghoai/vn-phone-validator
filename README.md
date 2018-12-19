# VN-PHONE-VALIDATOR
vn-phone-validator is a package support validate mobile phone number for five operator in Viet Nam, includes Viettel, Mobiphone, Vinaphone, Vietnamobile and Gmobile.

  - Compact
  - Fast
  - Powerful

##### *Note: Only for ten digit number or eleven digit with area code!*

### Installation

requires [Node.js](https://nodejs.org/) v4+ to run.

```sh
$ npm i vn-phone-validator
```

### API

Validate phone number
```js
const phoneValidate = require('vn-phone-validator')
phoneValidate.validate('0988888888').isValidate    // true
phoneValidate.validate('0988 888 888').isValidate  // true
phoneValidate.validate('84988 888 888').isValidate // true
phoneValidate.validate('0123456789').isValidate    // false
```

Options
- strict: true/false
```js
phoneValidate.validate('0988888888', {strict: true}).isValidate   // true
phoneValidate.validate('0988 888 888', {strict: true}).isValidate // false
```
- format: string
```js
phoneValidate.validate('0988888888', {format: 'xxxx xxx xxx'}).isValidate   // false
phoneValidate.validate('0988888888', {format: '097xxxxxx8'}).isValidate     // false
```
- operator: array (viettel, vinaphone, mobilephone, vietnamobile, gmobile)
```js
phoneValidate.validate('0988888888', {operator: ['vietnamobile']}).isValidate   // false
```

Special
- Get operator
```js
phoneValidate.validate('0988888888').operator()   // viettel
phoneValidate.validate('0123456789').operator()   // false
```
- Hidden number
```js
phoneValidate.validate('0988888888').hidden(4, '*') // 098888****
```
- Format number
```js
phoneValidate.validate('0988888888').format('xxxx.xxx.xxx')  // 0988.888.888
phoneValidate.validate('0988888888').format('84xxx xxx xxx') // 84988 888 888
```

### Test

```sh
$ npm run test
```

License
----

MIT

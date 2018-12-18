# VN-PHONE-VALIDATE
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
phoneValidate.validate('0988888888')    // true
phoneValidate.validate('0988 888 888')  // true
phoneValidate.validate('84988 888 888') // true
phoneValidate.validate('0123456789')    // false
```

Options
- strict: true/false
```js
phoneValidate.validate('0988888888', {strict: true})   // true
phoneValidate.validate('0988 888 888', {strict: true}) // false
```
- format: string
```js
phoneValidate.validate('0988888888', {format: 'xxxx xxx xxx'})   // false
phoneValidate.validate('0988888888', {format: '097xxxxxx8'})     // false
```
- operator: array (viettel, vinaphone, mobilephone, vietnamobile, gmobile)
```js
phoneValidate.validate('0988888888', {operator: ['vietnamobile']})   // false
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

### Test

```sh
$ npm run test
```

License
----

MIT

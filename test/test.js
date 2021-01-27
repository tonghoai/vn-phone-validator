const expect = require('chai').expect
const phoneValidate = require('../src')

const number1 = '0928499369'
const number2 = '0928 499 369'
const number3 = '092849 936 9'
const number4 = '84928499369'
const number5 = '0123456789'
const number6 = '1234567890'
const number7 = '12312312311'
const number8 = '09284993690'
const number9 = '0928 499 369 0'
const number10 = '849284993690'
const number11 = '84928 xxx 485'
const number12 = '092849 xxx 9'
const number13 = '+84987654321'
const number14 = '84877654321'

describe('# Tính hợp lệ của số điện thoại', function () {
  it('Phải đúng với số điện thoại thông thường', function () {
    expect(phoneValidate(number1).validate()).to.equal(true)
  })

  it('Phải đúng với số điện thoại có mã vùng việt nam', function () {
    expect(phoneValidate(number4).validate()).to.equal(true)
  })

  it('Phải đúng với số điện thoại có mã vùng việt nam có dấu +', function () {
    expect(phoneValidate(number13).validate()).to.equal(true)
  })

  it('Phải đúng với số điện thoại có định dạng', function () {
    expect(phoneValidate(number2).validate({ format: 'xxxx xxx xxx' })).to.equal(true)
  })

  it('Phải đúng với số điện thoại có định dạng cả số', function () {
    expect(phoneValidate(number3).validate({ format: 'x92xxx xxx x' })).to.equal(true)
  })

  it('Phải đúng với số điện thoại có dùng dấu cách nhưng không dùng format()', function () {
    expect(phoneValidate(number2).validate()).to.equal(true)
  })

  it('Phải đúng với số điện thoại dùng chế độ strict', function () {
    expect(phoneValidate(number1).validate({ strict: true })).to.equal(true)
  })

  it('Phải đúng với sử dụng format', function () {
    expect(phoneValidate(number2).format('xxx xxxx xxx')).to.equal('092 8499 369')
  })

  it('Phải đúng với sử dụng format có mã quốc gia', function () {
    expect(phoneValidate(number2).format('84xx xxxx xxx')).to.equal('8492 8499 369')
  })

  it('Phải ẩn được số điện thoại', function () {
    expect(phoneValidate(number1).hidden(4, '*')).to.equal('092849****')
  })

  it('Phải ẩn được số điện thoại - 2', function () {
    expect(phoneValidate(number2).hidden(4, '*')).to.equal('092849****')
  })

  it('Phải tìm ra được mạng itelecom', function () {
    expect(phoneValidate(number14).operator()).to.equal('itelecom')
  })

  it('Phải sai với số điện thoại khác 10, 11 chữ số', function () {
    expect(phoneValidate(number8).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại không đúng đầu số', function () {
    expect(phoneValidate(number5).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại không đúng đầu số 2', function () {
    expect(phoneValidate(number6).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại không đúng đầu số 3', function () {
    expect(phoneValidate(number7).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại có dấu cách nhưng số lượng chữ số không hợp lệ', function () {
    expect(phoneValidate(number9).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại có mã vùng nhưng số lượng không hợp lệ', function () {
    expect(phoneValidate(number10).validate()).to.equal(false)
  })

  it('Phải sai với số điện thoại dùng format không khớp', function () {
    expect(phoneValidate(number11).validate({ format: 'xxxx xxxx xx' })).to.equal(false)
  })

  it('Phải sai với số điện thoại dùng format có số không khớp', function () {
    expect(phoneValidate(number12).validate({ format: '092xxx xxx 8' })).to.equal(false)
  })

  it('Phải sai với dùng format()', function () {
    expect(phoneValidate(number2).format('xxx xxxx xxx')).to.not.equal('0928499 369')
  })
})
import sha256 from 'sha256'

export const DateConvert = (date) => {
  return new Date(date).toLocaleDateString()
}

export const GenderConvert = (gender) => {
  return gender ? 'Nữ' : 'Nam'
}

export const GenerateToken = (token) => {
  return sha256.x2('hello')
}

export const FormatPrice = (price) => {
  let val = (price / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

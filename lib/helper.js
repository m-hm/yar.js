import _ from 'lodash'

const DateFormat = Intl.DateTimeFormat('fa-IR').format

export const format = {
  date: v => DateFormat(new Date(v))
}

export function omitEmptyFields (fields) {
  return _.omitBy(fields, x => !x || /^\s*$/.test(x))
}

export function isNationalCode (v) {
  if (!/^[0-9]{10}$/.test(v)) { return false }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += (v[i] | 0) * (10 - i)
  }

  let rem = sum % 11
  if (rem > 1) { rem = 11 - rem }
  return (v[9] | 0) === rem
}

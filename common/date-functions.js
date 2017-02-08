var isSameDay = function (date1, date2) {
  if (!date1 || !date2) {
    return false
  }
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

var normalizeDate = function (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
var getMonthName = function (month) {
  return monthNames[month]
}

var moveDate = function (date, offset) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset)
}

exports.isSameDay = isSameDay
exports.normalizeDate = normalizeDate
exports.getMonthName = getMonthName
exports.moveDate = moveDate

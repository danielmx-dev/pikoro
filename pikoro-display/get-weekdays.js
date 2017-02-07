var ONE_DAY_IN_SECONDS = 24 * 60 * 60 * 1000
var TOTAL_NUMBER_OF_DAYS = 42

module.exports = function (year, month) {
  var startOfMonth = new Date(year, month, 1)
  var leftPadding = getLeftPadding(startOfMonth)
  var numberOfMissingDates = TOTAL_NUMBER_OF_DAYS - leftPadding.length

  return leftPadding.concat(generateMissingDates(startOfMonth, numberOfMissingDates))
}

var getLeftPadding = function (date) {
  var startDate = date.getDay()
  if (startDate === 0) {
    return []
  }

  var pivot = date
  var dates = []
  while (startDate--) {
    pivot = moveDate(pivot, -1)
    dates.unshift(pivot)
  }
  return dates
}

var moveDate = function (date, offset) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset)
}

var generateMissingDates = function (date, numberOfDays) {
  var pivot = date
  var dates = [pivot]
  while (--numberOfDays) {
    pivot = moveDate(pivot, 1)
    dates.push(pivot)
  }
  return dates
}

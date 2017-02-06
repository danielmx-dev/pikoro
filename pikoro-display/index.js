var domify = require('domify')
var fs = require('fs')
var buildWeeksHtml = require('./build-weeks-html')

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
var printMonth = function (month) {
  return monthNames[month]
}

var pikoroTemplate = fs.readFileSync(__dirname + '/template.html', 'utf8') // eslint-disable-line 

function Display (initDate) {
  // Variables
  var selectedDate
  var displayYear
  var displayMonth
  var root

  // Methods
  var selectDate = function (date) {
    selectedDate = date
    displayYear = date.getFullYear()
    displayMonth = date.getMonth()
    updateComponent()
  }

  var updateComponent = function () {
    root.querySelector('.pk-current-month').innerHTML = displayYear + ' ' + printMonth(displayMonth)
    root.querySelector('.pk-days-container').innerHTML = buildWeeksHtml(displayYear, displayMonth, selectedDate)
  }

  var initializeNodes = function () {
    root = domify(pikoroTemplate)
    root.querySelector('.pk-days-container').addEventListener('click', onDateClick)
    root.querySelector('.pk-previous-month').addEventListener('click', displayPreviousMonth)
    root.querySelector('.pk-next-month').addEventListener('click', displayNextMonth)
  }

  var onDateClick = function (event) {
    if (!event.target.classList.contains('pk-date')) {
      return
    }
    selectDate(new Date(Number(event.target.dataset.timestamp)))
  }

  var displayNextMonth = function () {
    if (displayMonth === 11) {
      displayMonth = 0
      displayYear++
    } else {
      displayMonth++
    }
    updateComponent()
  }

  var displayPreviousMonth = function () {
    if (displayMonth === 0) {
      displayMonth = 11
      displayYear--
    } else {
      displayMonth--
    }
    updateComponent()
  }

  var getComponent = function () {
    return root
  }

  // Initialization
  initDate = initDate || new Date()
  initializeNodes()
  selectDate(initDate)

  return {
    selectDate: selectDate,
    getComponent: getComponent
  }
}

Display.prototype.render = function () { }

module.exports = Display

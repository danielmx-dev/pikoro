var domify = require('domify')
var fs = require('fs')
var buildWeeksHtml = require('./build-weeks-html')
var EventEmitter = require('events').EventEmitter
var assign = require('lodash.assign')
var insertCss = require('insert-css')
var isSameDay = require('./is-same-day')

var css = fs.readFileSync(__dirname + '/styles.css', 'utf8') // eslint-disable-line 
insertCss(css)

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
  var currentMonth
  var currentYear
  var currentDate
  var root
  var emitter = new EventEmitter()

  // Methods
  var selectDate = function (date) {
    selectedDate = date
    displayYear = date.getFullYear()
    displayMonth = date.getMonth()
    updateComponent()
  }

  var updateComponent = function () {
    if (currentMonth !== displayMonth || currentYear !== displayYear) {
      root.querySelector('.pk-current-month').innerHTML = printMonth(displayMonth) + ' ' + displayYear
      root.querySelector('.pk-days-container').innerHTML = buildWeeksHtml(displayYear, displayMonth)

      currentMonth = displayMonth
      currentYear = displayYear
    }

    if (!isSameDay(selectedDate, currentDate)) {
      var container = root.querySelector('.pk-days-container')
      var selectedElement = container.querySelector('.selected')
      if (selectedElement) {
        selectedElement.classList.remove('selected')
      }

      var normalizedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      container.querySelector('.pk-date[data-timestamp="' + normalizedDate.getTime() + '"]').classList.add('selected')

      currentDate = selectedDate
    }
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
    var selected = new Date(Number(event.target.dataset.timestamp))
    selectDate(selected)
    emitter.emit('change', selected)
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

  // Module exports
  return assign(emitter, {
    selectDate: selectDate,
    getComponent: getComponent
  })
}

module.exports = Display

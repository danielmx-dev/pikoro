
module.exports = function (weekdays) {
  var html = ''
  weekdays.forEach(function (date) {
    if (date.getDay() === 0) {
      html += '<div>'
    }
    html += '<span style="display: inline-block; width:2em;">' + date.getDate() + '</span>'
    if (date.getDay() === 6) {
      html += '</div>'
    }
  })

  return html
}

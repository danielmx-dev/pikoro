var buildDateHtml = function (date, currentMonth) {
  var classes = ['pk-date', 'pk-cell']
  if (date.getMonth() !== currentMonth) {
    classes.push('another')
  }
  return '<span class="' + classes.join(' ') + '" data-timestamp="' + date.getTime() + '">' + date.getDate() + '</span>'
}

module.exports = buildDateHtml

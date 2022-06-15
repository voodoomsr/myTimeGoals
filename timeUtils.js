function convertMS(ms) {
  if(ms>0){
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    return h + ":" + m + ":" + s;
  }
  return 0
}

function convertH(ms) {
  if(ms>0)
    return (ms/1000/60/60).toFixed(2);
  return 0;
}

const getPreviousMonday = (date = null) => {
  const prevMonday = date && new Date(date.valueOf()) || new Date()
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)
  return prevMonday
}

module.exports = { convertMS, convertH, getPreviousMonday };

function percent(num){
    return Number(num).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
}


function dateString(customDate){
    return customDate.toISOString().slice(0,10)
}

module.exports = {percent, dateString}
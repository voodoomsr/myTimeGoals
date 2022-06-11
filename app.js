
require('dotenv').config()
let request = require('request')
let timeUtils = require("./timeUtils.js")
let stringUtils = require("./stringUtils")
const cliProgress = require('cli-progress');

const username = process.env.TOKEN
const password = 'api_token'
const user_agent = process.env.USER_AGENT
const workspace_id = process.env.WORKSPACE_ID
const base_url = 'https://api.track.toggl.com/reports/api/v2/weekly'
let since = stringUtils.dateString(timeUtils.getPreviousMonday())

let options = {
  url: `${base_url}?user_agent=${user_agent}&workspace_id=${workspace_id}&since=${since}`,
  auth: {
    user: username,
    password: password
  }
}

request(options, function (err, res, body) {
  if (err) {
    console.dir(err)
    return
  }
  data = JSON.parse(body)

  let growth = data.data[0].totals.at(-1)
  let work = data.data[1].totals.at(-1)
  console.log(`Starting from: ${since}`)
  console.log(`total growth: ${timeUtils.convertMS(growth)}`)
  console.log(`total work: ${timeUtils.convertMS(work)}`)
  currentGrowth = timeUtils.convertH(growth)
  currentWork = timeUtils.convertH(work)

  const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: '{payload} [{bar}] {percentage}% |{value}/{total}'
  }, cliProgress.Presets.shades_classic);
  multibar.create(10, currentGrowth, {payload: 'growth'})
  multibar.create(30, currentWork, {payload:   'work  '})
  multibar.stop()
})
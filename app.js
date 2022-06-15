require("dotenv").config();
let request = require("request");
let timeUtils = require("./timeUtils.js");
let stringUtils = require("./stringUtils");
const cliProgress = require("cli-progress");

const username = process.env.TOKEN;
const password = "api_token";
const user_agent = process.env.USER_AGENT;
const workspace_id = process.env.WORKSPACE_ID;
const projects = process.env.PROJECTS.split(",");
const goals = process.env.GOALS.split(",");
const base_url = "https://api.track.toggl.com/reports/api/v2/weekly";
let since = stringUtils.dateString(timeUtils.getPreviousMonday());

let options = {
  url: `${base_url}?user_agent=${user_agent}&workspace_id=${workspace_id}&since=${since}`,
  auth: {
    user: username,
    password: password,
  },
};

request(options, function (err, res, body) {
  if (err) {
    console.dir(err);
    return;
  }
  data = JSON.parse(body);
  console.log(`Starting from: ${since}`);

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: "{payload} [{bar}] {percentage}% |{value}/{total}",
    },
    cliProgress.Presets.shades_classic
  );

  projects.map((project, index) => {
    let projectTotal = getTotalByProject(project, data);
    console.log(`total ${project}: ${timeUtils.convertMS(projectTotal)}`);
    projectHours = timeUtils.convertH(projectTotal);
    multibar.create(goals[index], projectHours, { payload: project });
  });
  multibar.stop();
});

function getTotalByProject(projectName, data) {
  let filteredData = data.data.filter(
    (projectData) => projectData.title.project === projectName
  );
  if (filteredData.length > 0) return filteredData[0].totals.at(-1);
  else 0;
}

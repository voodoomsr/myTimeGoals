
- create function to obtain last week start and end day with format YYYY-MM-DD
    - according to function only since will be required that means obtain last monday date will be enough
- adjust request to provide `since` and `until` query parameters using previous function as input
    - only `since` is necessary, until as default will be today (if it is in the future will be since + 6 days)
- adjust function to obtain times correctly if no time has been registered in the period
    - that means check for growth and work existence exploring object `data[x].title.project`
- show start and end date in the output
- implement .dotenv

- reference: https://github.com/toggl/toggl_api_docs/blob/master/reports.md
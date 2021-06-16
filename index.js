const { WebClient } = require('@slack/web-api');
const github = require('@actions/github');
const core = require('@actions/core');

const new_pull_request = async () => {

  const {payload} = github.context
  const channelId = core.getInput('channel-id');
  const botToken = core.getInput('slack-bot-token');
  const project = core.getInput('jira-project-acronym');
  let baseUrl = core.getInput('jira-base-url');

  baseUrl = baseUrl[baseUrl.length - 1] === '/' ? baseUrl : baseUrl + '/';

  const jiraTickets = (payload.pull_request.title.match(new RegExp(`${project}-\\d{1,4}`,'g')) || []).map((occur) => `• For <${baseUrl}browse/${occur}|${occur}>`).join('\n')
  const messages = `Amazing job done by *_${payload.sender.login}_* ! :tada:\n` + 
  `• Created new <${payload.pull_request.html_url}|PR> on <${payload.repository.html_url}|${payload.repository.full_name}> \n ${jiraTickets  || ''}`

  const client = new WebClient(botToken);
  await client.chat.postMessage({ channel: channelId, text: messages })
}

async function run() {
  const event = core.getInput('event')
  try {
    switch(event){
      case 'new_pull_request':
        await new_pull_request();
        break;
      default:
        await new_pull_request();
        break;
    }
  }
  catch (error){
    core.setFailed(error.message);
  }
}

run();

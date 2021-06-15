const { WebClient } = require('@slack/web-api');
const github = require('@actions/github');
const core = require('@actions/core');

const new_pull_request = async () => {

  const {payload} = github.context
  const channelId = core.getInput('channel-id');
  const botToken = core.getInput('slack-bot-token');
  let baseUrl = core.getInput('jira-base-url');
  const project = core.getInput('jira-proyect-acronym');

  const strRegExPattern = '\\b'+`${project}-\d{1,4}`+'\\b'; 
  baseUrl = baseUrl[baseUrl.lenght - 1] === '/' ? baseUrl : baseUrl + '/';

  const messages = `Amazing job done by *_${payload.sender.login}_* ! :tada:\n
• Created new <${payload.pull_request.html_url}|PR> on <${payload.repository.html_url}|${payload.repository.full_name}> \n
${payload.pull_request.title.match(new RegExp(strRegExPattern,'g'))?.map((occur) => `• For <${baseUrl}browse/${occur}|${occur}>`)?.join('\n') || ''}`

  const client = new WebClient(botToken);
  await client.chat.postMessage({ channel: channelId, text: messages })
}

async function run() {
  const event = core.getInput('event')
  try {
    switch(event){
      case 'new_pull_request':
        await post();
        break;
      default:
        await post();
        break;
    }
  }
  catch (error){
    core.setFailed(error.message);
  }
}

run();

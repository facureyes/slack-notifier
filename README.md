# Slack Notifier
> Lightweight github action for posting to slack (using [node-slack-sdk](https://github.com/slackapi/node-slack-sdk)).

[Slack Notifier](https://github.com/facureyes/slack-notifier) allows you interact with slack while exposing [Github's payload](https://developer.github.com/webhooks/event-payloads/). Pairing with a slack bot, this action is able to `post` a message when a specific event occurs. This is still in develop phase. New events will be added.

## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a `.github/workflows/hd-slack-notifier.yml` file in your GitHub repo.
2. Add the following code to the `hd-slack-notifier.yml` file. 

<!-- Note that the message is javascript code that get executed and provided the `payload` variable which is [provided by github](https://developer.github.com/webhooks/event-payloads/) -->

```yml
name: Slack Notifier
on: 
  pull_request:
    types: [opened, reopened]
jobs:
  send-notification:
    runs-on: ubuntu-latest
    steps:
      - name: Posting to slack
        uses: facureyes/slack-notifier@v1.0
        with:
          slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
          channel-id: ${{ secrets.SLACK_CHANNEL_ID }}
          event: new_pull_request
          jira-base-url: https://example.atlassian.net/
          jira-project-acronym: EXPL
```

3. Create `SLACK_BOT_TOKEN` and `SLACK_CHANNEL_ID` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You will need to [generate a Slack bot token from here](https://api.slack.com/authentication/token-types#bot) and assign it the appropriate authorization(see `Setting up Actions`) and [locate the channel ID](https://stackoverflow.com/a/57246565/9932533).

## Environment Variables

By default, action is designed to run with minimal configuration but you can alter Slack notification using following environment variables:

Variable  | Default | Purpose
----|----|----
event | - | The event define message template to be used. Currently support `new_pull_request`.
jira-base-url | - | Jira's base url of your organisation.
jira-project  | - | Jira's project acronym.
slack-bot-token | - | Slack bot authentication token
channel-id  | - | Slack channel to post to, to get the channel id follow this [guide](https://stackoverflow.com/a/57246565/9932533) 

## Building / Deploying / Publishing

### Steps to build a new version

- [Reference](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- Add vercel `npm i -g @vercel/ncc`

```
ncc build index.js
git add action.yml index.js dist/index.js node_modules/* 
git commit -m "<commit message>"
git tag -a -m "<tag message>" <tag name>
git push --follow-tags
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links

- Project homepage: https://github.com/facureyes/slack-notifier
- Repository: https://github.com/facureyes/slack-notifier
- Issue tracker: https://github.com/facureyes/slack-notifier/issues
- In case of sensitive bugs like security vulnerabilities, please contact [facundotomasreyes@gmail.com](mailto:facundotomasreyes@gmail.com)

## Licensing

The code in this project is licensed under MIT license.

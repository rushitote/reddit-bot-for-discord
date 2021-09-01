# Reddit Bot for Discord

This is a simple Reddit bot that gets a random post from the top posts of the week from Reddit and posts it to Discord.

## Usage

You can send a message with the `red` prefix in Discord followed by any subreddit name that you would like to see a post from. For example, this will get you a random post from the r/Python subreddit:
```
red python
```

## Config

To set up this bot, you will need:
1. Discord Token: See the guide for this [here](https://www.writebots.com/discord-bot-token/).
2. Reddit Personal Use Script and Reddit Secret: You can create one [here](https://www.reddit.com/prefs/apps).
3. Reddit Refresh Token and Reddit Access Token: You can create one using [this](https://github.com/not-an-aardvark/reddit-oauth-helper).
4. Reddit Username

Then save all these in a `.env` file in this format:
```conf
DISCORD_TOKEN=
REDDIT_PERSONAL_USE_SCRIPT=
REDDIT_SECRET=
REDDIT_REFRESH_TOKEN=
REDDIT_ACCESS_TOKEN=
REDDIT_USERNAME=
```

Then run the `index.js`:
```bash
node index.js
```

**NOTE**: Since this uses discord.js v13 you will need Node v16.6+ to run this.
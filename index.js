const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const dotenv = require("dotenv");
const reddit = require("./reddit");
dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let postReply = async (msg, subreddit) => {
  let embedObject = await reddit.getPost(subreddit);
  if (embedObject.error) {
    msg.reply(
      "Sorry, either the subreddit is not accessible or an internal server error."
    );
    return;
  }

  if (embedObject.over_18) {
    msg.reply("Not allowed here.");
    return;
  }

  const embed = new Discord.MessageEmbed();
  embed.setTitle(embedObject.title);
  embed.setFooter(embedObject.sub);
  embed.setURL(embedObject.link);
  embed.setTimestamp();
  embed.setColor("#ff4500");

  if (
    embedObject.thumbnail != "self" &&
    embedObject.thumbnail != "" &&
    embedObject.thumbnail != null &&
    embedObject.thumbnail != "default"
  ) {
    embed.setThumbnail(embedObject.thumbnail);
  }

  if (embedObject.text != "self" && embedObject.text != "") {
    if (embedObject.text.length > 4000) {
      embed.setDescription(embedObject.text.slice(0, 4000) + "...");
    } else {
      embed.setDescription(embedObject.text);
    }
  }

  if (embedObject.image) {
    embed.setImage(embedObject.image);
  }

  if (embedObject.redditVideo) {
    msg.reply(embedObject.redditVideo);
    return;
  }

  msg.reply({ embeds: [embed] });
  if (embedObject.video) {
    msg.reply(embedObject.video);
  }
};

client.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase().startsWith("red ")) {
    let words = msg.content.toLowerCase().split(" ");
    let subreddit = words[1];

    (async () => {
      try {
        await postReply(msg, subreddit);
      } catch {
        msg.reply("Sorry, something went wrong.");
      }
    })();
  }
});

client.login(process.env.DISCORD_TOKEN);

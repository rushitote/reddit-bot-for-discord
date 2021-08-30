"use strict";
const snoowrap = require("snoowrap");
const dotenv = require("dotenv");
dotenv.config();

const r = new snoowrap({
  userAgent: "Reddit Bot by u/" + process.env.REDDIT_USERNAME,
  clientId: process.env.REDDIT_PERSONAL_USE_SCRIPT,
  clientSecret: process.env.REDDIT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  accessToken: process.env.REDDIT_ACCESS_TOKEN,
});

let getTopPost = async (subreddit) => {
  let postsFunc = async (posts) => {
    let rndPost = Math.floor(Math.random() * posts.length);
    let post = posts[rndPost];
    let obj = {};

    if (post.over_18) {
      obj.over_18 = true;
    }

    if (post.thumbnail) {
      obj.thumbnail = post.thumbnail;
    }

    // if post is image
    if (
      post.url.endsWith(".png") ||
      post.url.endsWith(".jpg") ||
      post.url.endsWith(".jpeg")
    ) {
      obj.image = post.url;
    }
    // if post is reddit video
    else if (post.is_video) {
      if (post.url.includes("v.redd.it")) {
        obj.video = post.media.reddit_video.fallback_url;
      }
    } 
    // if post is video
    else if (
      post.url.endsWith(".mp4") ||
      post.url.endsWith(".gifv") ||
      post.url.endsWith(".gif") ||
      post.url.includes("gfycat") ||
      post.url.includes("youtu.be")
    ) {
      obj.video = post.url;
    }

    obj.text = post.selftext + '\n' + post.url;
    obj.title = post.title;
    obj.sub = post.subreddit_name_prefixed;
    obj.link = "https://reddit.com" + post.permalink;
    return obj;
  };

  try {
    let x = await r.getTop(subreddit, { limit: 50, time: "week" });
    let obj = await postsFunc(x);
    log(obj);
    return obj;
  } catch {
    let obj = {
      error: true,
    };
    return obj;
  }
};

let log = (obj) => {
  console.log(obj);
};

// test module
// (async () => {
//   let obj = await getTopPost("python");
//   console.log(obj);
// })();

module.exports.getPost = getTopPost;

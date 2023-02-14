#! /usr/bin/env node

import open from "open";
import fetch from "node-fetch";
import yargs from "yargs";

const { argv } = yargs(process.argv);

const res = await fetch("https://www.reddit.com/.json");
const data = await res.json();

const randomIndex = Math.floor(Math.random() * data.data.children.length);

const randomPost = data.data.children[randomIndex];
const link = `https://reddit.com${randomPost.data.permalink}`;

if (argv.print) {
  console.log(`
      Title: ${randomPost.data.title}\n
      Link: ${link}
    `);
} else if (argv.help) {
  console.log(`reddit --print`);
} else if (argv.version) {
  console.log("1.0.0");
} else {
  open(link);
}

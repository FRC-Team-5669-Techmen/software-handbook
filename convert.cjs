var glob = require("glob")
var fs = require('fs')
var SimpleMarkdown = require("simple-markdown");
var markdown = require("markdown-it")
var md = new markdown()

//get summary file in docs folder
var summary = fs.readFileSync("./docs/SUMMARY.md", 'utf8')
const content = md.parse(summary)
console.log( JSON.stringify(content, null, "\t"))
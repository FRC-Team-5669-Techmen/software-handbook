var glob = require("glob")
var fs = require('fs')

//get summary file in docs folder
glob("docs/SUMMARY.md", function (er, files) {
  console.log(files)
}
)
// options is optional
glob("docs/**/*", 
{mark: true}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  files.forEach(e => {
    //use fs to see if it is a directory
    console.log(fs.statSync(e).isDirectory() + " " + e)
  })
})
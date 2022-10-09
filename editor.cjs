const express = require("express");
const app = express();
const port = 3000;
var index = require("./docs/summary.json");
app.use(express.static("editor"));

app.post("/files", (req, res) => {
	res.send(index);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

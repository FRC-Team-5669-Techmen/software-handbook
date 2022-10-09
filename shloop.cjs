var Walk = require("@root/walk");
var path = require("path");
var fs = require("fs");
const { parse } = require("path");

Walk.walk("./docs/", dirWalk).then(function () {
	console.log("Done");
	console.log(JSON.stringify(outputSummary, null, 2));
	Walk.walk("./docs/", fileWalk).then(function () {
		console.log(JSON.stringify(outputSummary, null, 2));
		fs.writeFileSync(
			"./src/lib/summary.json",
			JSON.stringify(outputSummary, null, 2)
		);
		var routes = fs.readdirSync("./src/routes");
		//delete everything, including folders and their contents in the routes folder unless its a .svelte file
		for (var i = 0; i < routes.length; i++) {
			var route = routes[i];
			if (!route.endsWith(".svelte")) {
				fs.rmSync("./src/routes/" + route, { recursive: true });
			}
		}
		Walk.walk("./docs/", fileTransferWalk).then(function () {
			console.log("asdf");
		});
	});
	Walk.walk("./docs/", fileWalkNormalSummary).then(function () {
		console.log("asdf");
		fs.writeFileSync(
			"./docs/summary.json",
			JSON.stringify(normalSummary, null, 2)
		);
	});
});

var outputSummary = {
	pages: [],
	categories: {},
};

var normalSummary = {
	pages: [],
	categories: {},
};

// walkFunc must be async, or return a Promise
function dirWalk(err, pathname, dirent) {
	// return false to skip a directory
	// (ex: skipping "dot file" directories)
	if (dirent.isDirectory() && dirent.name.startsWith(".")) {
		return Promise.resolve(false);
	}

	var Category = pathname.split("\\")[1] || null;
	var Section = pathname.split("\\")[2] || null;

	if (!dirent.isFile() || fs.lstatSync(pathname + "\\").isDirectory()) {
		if (Category && !Section) {
			outputSummary.categories[Category] = {
				pages: [],
				sections: {},
			};
		} else if (Category && Section) {
			outputSummary.categories[Category].sections[Section] = {
				pages: [],
			};
		}
	}
	// copy output summary without relation
	normalSummary = JSON.parse(JSON.stringify(outputSummary));
	return Promise.resolve();
}
function fileWalk(err, pathname, dirent) {
	var Category = path.dirname(pathname).split("\\")[1] || null;
	var Section = path.dirname(pathname).split("\\")[2] || null;
	pathname = pathname
		.replace(/\$[0-9]+\$/, "")
		.replace(/\\/g, "/")
		.replace("docs", "");

	if (dirent.isFile()) {
		if (pathname.endsWith(".json")) return Promise.resolve();
		var title = fs.readFileSync("./docs" + pathname, "utf8").split("\n")[1];
		pathname = pathname.replace(".md", "").replace("README", "");
		if (title) title = title.replace("\r", "");
		console.log(title);
		var match = pathname.match(/\$[0-9]+\$/) || null;
		var index = match ? parseInt(match[0].replace("$", "")) || null : null;
		if (Category && !Section) {
			if (index) {
				outputSummary.categories[Category].pages[index] = [title, pathname];
			} else {
				outputSummary.categories[Category].pages.push([title, pathname]);
			}
		} else if (Category && Section) {
			if (index) {
				outputSummary.categories[Category].sections[Section].pages[index] = [
					title,
					pathname,
				];
			} else {
				outputSummary.categories[Category].sections[Section].pages.push([
					title,
					pathname,
				]);
			}
		} else {
			if (index) {
				outputSummary.pages[index] = [title, pathname];
			} else {
				outputSummary.pages.push([title, pathname]);
			}
		}
	}
	return Promise.resolve();
}
function fileTransferWalk(err, pathname, dirent) {
	var Category = path.dirname(pathname).split("\\")[1] || null;
	var Section = path.dirname(pathname).split("\\")[2] || null;
	pathname = pathname.replace(/\\/g, "/").replace("docs", "");

	if (dirent.isFile()) {
		if (pathname.endsWith(".json")) return Promise.resolve();
		var title = fs.readFileSync("./docs" + pathname, "utf8").split("\n")[1];
		var originalFile = "./docs" + pathname;
		pathname = pathname.replace(".md", "").replace("README", "");
		if (title) title = title.replace("\r", "");
		console.log(title);
		var match = pathname.match(/\$[0-9]+\$/) || null;
		var index = match ? parseInt(match[0].replace("$", "")) || null : null;
		pathname = pathname.replace(/\$[0-9]+\$/, "");
		//take last part of pathname off
		var destFile =
			"./src/routes" + pathname.split("/").slice(0, -1).join("/") + "/+page.md";
		if (Section) destFile = "./src/routes" + pathname + "/+page.md";
		var Page = pathname.split("/")[3] || null;
		if (!fs.existsSync("./src/routes/" + Category) && Category) {
			fs.mkdirSync("./src/routes/" + Category);
		}
		if (!fs.existsSync("./src/routes/" + Category + "/" + Section) && Section) {
			fs.mkdirSync("./src/routes/" + Category + "/" + Section);
		}
		console.log("./src/routes/" + Category + "/" + Section + "/" + Page);
		if (
			!fs.existsSync("./src/routes/" + Category + "/" + Section + "/" + Page) &&
			Page
		) {
			fs.mkdirSync("./src/routes/" + Category + "/" + Section + "/" + Page);
		}

		var file = fs.readFileSync(originalFile, "utf8").split("\n");
		//remove first 3 lines & join with \n
		file = file.slice(3).join("\n");
		fs.writeFileSync(destFile, file);
	}
	return Promise.resolve();
}

function fileWalkNormalSummary(err, pathname, dirent) {
	var Category = path.dirname(pathname).split("\\")[1] || null;
	var Section = path.dirname(pathname).split("\\")[2] || null;
	pathname = pathname
		.replace(/\$[0-9]+\$/, "")
		.replace(/\\/g, "/")
		.replace("docs", "");

	if (dirent.isFile()) {
		if (pathname.endsWith(".json")) return Promise.resolve();
		var title = fs.readFileSync("./docs" + pathname, "utf8").split("\n")[1];
		pathname = "./docs" + pathname;
		if (title) title = title.replace("\r", "");
		console.log(title);
		var match = pathname.match(/\$[0-9]+\$/) || null;
		var index = match ? parseInt(match[0].replace("$", "")) || null : null;
		if (Category && !Section) {
			if (index) {
				normalSummary.categories[Category].pages[index] = [title, pathname];
			} else {
				normalSummary.categories[Category].pages.push([title, pathname]);
			}
		} else if (Category && Section) {
			if (index) {
				normalSummary.categories[Category].sections[Section].pages[index] = [
					title,
					pathname,
				];
			} else {
				normalSummary.categories[Category].sections[Section].pages.push([
					title,
					pathname,
				]);
			}
		} else {
			if (index) {
				normalSummary.pages[index] = [title, pathname];
			} else {
				normalSummary.pages.push([title, pathname]);
			}
		}
	}
	return Promise.resolve();
}

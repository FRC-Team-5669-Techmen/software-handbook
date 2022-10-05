var fs = require("fs");
var summary = fs.readFileSync("./docs/SUMMARY.md", "utf8");
var convertedSummary = convertMarkdownToObject(summary);
fs.writeFileSync(
	"./docs/summary.json",
	JSON.stringify(convertedSummary, null, 2)
);
fs.writeFileSync(
	"./src/lib/summary.json",
	JSON.stringify(convertForLibraryUse(summary), null, 2)
);
function convertMarkdownToObject(md) {
	var lines = md.split("\n");
	var content = {
		pages: [],
		categories: {},
	};
	var currentCategory = null;
	var currentSection = null;
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.startsWith("# ")) {
			//category
			currentCategory = line.substring(1).trim();
			content.categories[currentCategory] = {
				pages: [],
				sections: {},
			};
		} else if (line.startsWith("##")) {
			//section
			currentSection = line.substring(2).trim();
			content.categories[currentCategory].sections[currentSection] = {
				pages: [],
			};
		} else if (line.startsWith("-")) {
			var adjustedLine = line.replace("- ", "");
			var link = adjustedLine.match(/\[(.*?)\]/)[1];
			content.categories[currentCategory].sections[currentSection].pages.push([
				link,
				adjustedLine.match(/\((.*?)\)/)[1],
			]);
		} else if (line.startsWith("[")) {
			//link
			var link = line.match(/\[(.*?)\]/)[1];
			if (currentCategory == null) {
				content.pages.push([link, line.match(/\((.*?)\)/)[1]]);
			} else {
				content.categories[currentCategory].pages.push([
					link,
					line.match(/\((.*?)\)/)[1],
				]);
			}
		}
	}
	return content;
}

function convertForLibraryUse(md) {
	var lines = md.split("\n");
	var content = {
		pages: [],
		categories: {},
	};
	var currentCategory = null;
	var currentSection = null;
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.startsWith("# ")) {
			//category
			currentCategory = line.substring(1).trim();
			content.categories[currentCategory] = {
				pages: [],
				sections: {},
			};
		} else if (line.startsWith("##")) {
			//section
			currentSection = line.substring(2).trim();
			content.categories[currentCategory].sections[currentSection] = {
				pages: [],
			};
		} else if (line.startsWith("-")) {
			var adjustedLine = line.replace("- ", "");
			var link = adjustedLine.match(/\[(.*?)\]/)[1];
			content.categories[currentCategory].sections[currentSection].pages.push([
				link,
				adjustedLine
					.match(/\((.*?)\)/)[1]
					.replace("../docs", "")
					.replace("README.md", "")
					.replace(".md", ""),
			]);
		} else if (line.startsWith("[")) {
			//link
			var link = line.match(/\[(.*?)\]/)[1];
			if (currentCategory == null) {
				content.pages.push([
					link,
					line
						.match(/\((.*?)\)/)[1]
						.replace("../docs", "")
						.replace("README.md", "")
						.replace(".md", ""),
				]);
			} else {
				content.categories[currentCategory].pages.push([
					link,
					line
						.match(/\((.*?)\)/)[1]
						.replace("../docs", "")
						.replace("README.md", "")
						.replace(".md", ""),
					,
				]);
			}
		}
	}
	return content;
}

transferToRoutes();
function transferToRoutes() {
	//transfer the files linked in the convertedSummary to the routes folder, deleting any files that are not .svelte files
	var routes = fs.readdirSync("./src/routes");
	//delete everything, including folders and their contents in the routes folder unless its a .svelte file
	for (var i = 0; i < routes.length; i++) {
		var route = routes[i];
		if (!route.endsWith(".svelte")) {
			fs.rmSync("./src/routes/" + route, { recursive: true });
		}
	}
	convertedSummary.pages.forEach((page) => {
		fs.copyFileSync(page[1].replace("..", "."), "./src/routes/+page.md");
	});
	//each category in convertedsummary
	for (var category in convertedSummary.categories) {
		fs.mkdirSync(
			"./src/routes/" + category.toLocaleLowerCase().replace(" ", "-")
		);
		//each page in the category
		convertedSummary.categories[category].pages.forEach((page) => {
			fs.copyFileSync(
				page[1].replace("..", "."),
				"./src/routes/" +
					category.toLocaleLowerCase().replace(" ", "-") +
					"/+page.md"
			);
		});
		//each section in the category
		for (var section in convertedSummary.categories[category].sections) {
			fs.mkdirSync(
				"./src/routes/" +
					category.toLocaleLowerCase().replace(" ", "-") +
					"/" +
					section.toLocaleLowerCase().replace(" ", "-")
			);
			convertedSummary.categories[category].sections[section].pages.forEach(
				(page) => {
					fs.mkdirSync(
						"./src/routes/" +
							category.toLocaleLowerCase().replace(" ", "-") +
							"/" +
							section.toLocaleLowerCase().replace(" ", "-") +
							"/" +
							page[0].toLocaleLowerCase().replace(" ", "-")
					);
					fs.copyFileSync(
						page[1].replace("..", "."),
						"./src/routes/" +
							category.toLocaleLowerCase().replace(" ", "-") +
							"/" +
							section.toLocaleLowerCase().replace(" ", "-") +
							"/" +
							page[0].toLocaleLowerCase().replace(" ", "-") +
							"/+page.md"
					);
				}
			);
		}
	}
}

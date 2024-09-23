const fs = require('fs');
const path = require('path');

function copyFiles(srcFolder, outFolder, ext) {

	const files = fs.readdirSync(srcFolder)
		.filter(file => file.endsWith(ext));

	for (const file of files) {

		const from = path.join(srcFolder, file);
		const to = path.join(outFolder, file);

		fs.copyFileSync(from, to);
	}
}

function processJSFiles(fromFolder, toFolder) {

	const files = fs.readdirSync(fromFolder)
		.filter(file => file.endsWith(".js"));

	for (const file of files) {

		const from = path.join(fromFolder, file);
		const to = path.join(toFolder, file);

		let content = fs.readFileSync(from, "utf8");

		const importRegex = /from "([^"]+)"/g;

		content = content.replace(importRegex, (match, p1) => {
			return `from "${p1}.js"`;
		});

		console.log(`Writing ${to}`);
		fs.writeFileSync(to, content);
	}
}

const packageData = JSON.parse(fs.readFileSync("package.json"));
const name = packageData.name
	.replaceAll("@", "")
	.replaceAll("/", "_")
	.replaceAll("-", "_");

const version = packageData.version;

fs.mkdirSync(`browser/${name}`, { recursive: true });

fs.writeFileSync(`browser/${name}/library.txt`, version);
copyFiles("src", `browser/${name}/`, ".scene");
copyFiles("src", `browser/${name}/`, ".components");
processJSFiles("out", `browser/${name}/`);
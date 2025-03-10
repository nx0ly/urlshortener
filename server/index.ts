import express from "express";
import fs from "fs";
import ShortURL from "./handleURL/createURL.js";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../", "/index.html"));
});

app.get("*", async (req, res) => {
	const requestedURL = req.url.split("/")[1];

	const json = JSON.parse(
		fs.readFileSync("./server/urls.json", {
			encoding: "utf8",
		}),
	);

	console.log(`url requested: ${req.url} ${requestedURL} ${json[requestedURL]}`);

	if (json[requestedURL]) {
		res.writeHead(301, { Location: json[requestedURL] });
		res.end();
		return;
	}

	res.sendStatus(404);
});

app.post("/api/create", async (req, res) => {
	const data = req.body;

	if (data?.origin) {
		const url = await ShortURL.create(data.origin);

		const json = JSON.parse(
			fs.readFileSync("./server/urls.json", {
				encoding: "utf8",
			}),
		);

		if (json[url.getHash]) {
			res.status(403).json({ message: "URL already exists" });
			return;
		}

		json[url.getHash] = data.origin;
		fs.writeFileSync("./server/urls.json", JSON.stringify(json, null, 2), "utf8");
		res.status(200).json({ ok: true, message: url.getHash });

		res.redirect(data.origin);
	} else {
		res.status(400).json({ ok: false, message: "origin URL is required" });
	}

	//res.sendStatus(200);
});

app.listen(3000, () => {
	console.log("app listening on port 3000");
});

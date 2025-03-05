import express from "express";
import fs from "node:fs";
import ShortURL from "./handleURL/createURL.js";
import path from "node:path";
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
		fs.readFileSync("C:/Users/pc/Desktop/url shortener/server/urls.json", {
			encoding: "utf8",
		}),
	);

	if (json[requestedURL]) {
		res.redirect(json[requestedURL]);
		return;
	}

	res.sendStatus(200);
});

app.post("/api/create", async (req, res) => {
	const data = req.body;

	if (data?.origin) {
		const url = await ShortURL.create(data.origin);

		const json = JSON.parse(
			fs.readFileSync("C:/Users/pc/Desktop/url shortener/server/urls.json", {
				encoding: "utf8",
			}),
		);

		if (json[url.getHash]) {
			res.status(403).json({ message: "URL already exists" });
			return;
		}

		json[url.getHash] = data.origin;
		fs.writeFileSync("C:/Users/pc/Desktop/url shortener/server/urls.json", JSON.stringify(json, null, 2), "utf8");
		res.status(200).json({ message: "good" });

		res.redirect(data.origin);

		return;
	} else {
		res.status(400).json({ message: "origin URL is required" });

		return;
	}

	res.sendStatus(200)
});

app.listen(3000, () => {
	console.log("app listening on port 3000");
});

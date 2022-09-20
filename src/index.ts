import cors from "cors";
import fs from "fs";
import * as path from 'path';

function readJson(pathFile: string) {
    const encoding = 'utf8';
    var file = fs.readFileSync(path.join(__dirname, pathFile), encoding);
    return JSON.parse(file);
}

var express = require("express");
var app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: any, res: any) => {
    res.send(readJson('../resources/template.json'));
});

app.post("/", (req: any, res: any) => {
    console.log(req.body);
    res.send(readJson('../resources/template.json'));
});

app.all('*')

app.listen(3000, () => { console.log("Server running on port 3000"); });
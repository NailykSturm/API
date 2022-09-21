import cors from "cors";
import fs from "fs";
import * as path from 'path';
const RESOURCES_PATH = './resources/';

function readJson(pathFile: string) {
    const encoding = 'utf8';
    var file = fs.readFileSync(path.join(__dirname, pathFile), encoding);
    return JSON.parse(file);
}

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var express = require("express");
var app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: any, res: any) => {
    res.send(readJson(`${RESOURCES_PATH}json/1.json`));

});

app.post("/", (req: any, res: any) => {
    const nexts = req.body.next;
    if (nexts != undefined) {
        const next = nexts[getRndInteger(0, nexts.length)];
        try {
            const jsonres = readJson(`${RESOURCES_PATH}json/${next}.json`);
            res.send(jsonres);
        } catch (e: any) {
            var jsonres = readJson(`${RESOURCES_PATH}json/${req.body.id}.json`);
            if (e.code == "ENOENT") {
                console.log("Attention, on essaie d'accéder à un fichier inconnu !");
                jsonres.error = "Une erreure est survenue => la suite de la quête n'est pas encore implémenter. Veuillez réessayer";
                res.send(jsonres);
            } else {
                console.log(e);
                jsonres.error = "Une erreure est survenue, on y travaille, désolé. Veuillez réessayer";
                res.send(jsonres);
            }
        }
    } else {
        var json = JSON.parse("{}");
        json.error = "Rien n'a été envoyé! Comment suis-je censé répondre?";
        res.send(json);
    }
});

app.post("/pnj", (req: any, res: any) => {
    const pnjasked = req.body.pnjImg;
    console.log("pnjasked = " + pnjasked);
    if (pnjasked != undefined) {
        const path = `${RESOURCES_PATH.slice(1)}${pnjasked}`;
        console.log("full path = " + __dirname + path);
        res.sendFile(__dirname + path);
    } else {
        var json = JSON.parse("{}");
        json.error = "Rien n'a été envoyé! Comment suis-je censé répondre?";
        res.send(json);
    }
});

app.post("/background", (req: any, res: any) => {
    const bgasked = req.body.bgImg;
    console.log("bgasked = " + bgasked);
    if (bgasked != undefined) {
        const path = `${RESOURCES_PATH.slice(1)}${bgasked}`;
        console.log("full path = " + __dirname + path);
        res.sendFile(__dirname + path);
    } else {
        var json = JSON.parse("{}");
        json.error = "Rien n'a été envoyé! Comment suis-je censé répondre?";
        res.send(json);
    }
});

app.listen(3000, () => { console.log("Server running on port 3000"); });
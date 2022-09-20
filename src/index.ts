import cors from "cors";
import fs from "fs";
import * as path from 'path';

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
    res.send(readJson('../resources/json/1.json'));

});

app.post("/", (req: any, res: any) => {
    console.log(req.body);
    const nexts = req.body.next;
    console.log(nexts);
    const next = nexts[getRndInteger(0, nexts.length)];
    console.log(next);
    try {
        const jsonres = readJson(`../resources/json/${next}.json`);
        console.log(jsonres);
        res.send(jsonres);
    } catch (e: any) {
        var jsonres = readJson(`../resources/json/${req.body.id}.json`);
        if(e.code == "ENOENT"){
            console.log("Attention, on essaie d'accéder à un fichier inconnu !");
            jsonres.error = "Une erreure est survenue => la suite de la quête n'est pas encore implémenter. Veuillez réessayer";
            res.send(jsonres);
        }else {
            console.log(e);
            jsonres.error = "Une erreure est survenue, on y travaille, désolé. Veuillez réessayer";
            res.send(jsonres);
        }
    }
});

app.all('*')

app.listen(3000, () => { console.log("Server running on port 3000"); });
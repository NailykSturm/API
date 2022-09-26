import cors from "cors";
import fs, { cp } from "fs";
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
    // Renvoie un nouvel id pour le joueur => C'est un nouveau joueur
    res.send(readJson(`${RESOURCES_PATH}json/1.json`));

});

app.post("/", (req: any, res: any) => {
    // Renvoie la progression du joueur => Carte + Statistiques
    const idPlayer = req.body.id;
    console.log("idPlayer = ");
    console.log(idPlayer);
    if (idPlayer != undefined) {
        res.send(readJson(`${RESOURCES_PATH}json/1.json`));
    } else {
        var json = JSON.parse("{}");
        json.error = "Rien n'a été envoyé! Comment suis-je censé répondre?";
        res.send(json);
    }
});

app.post("/next", (req: any, res: any) => { 
    // Renvoie la prochaine carte et sauvegarde la progression du joueur
    const player = req.body.player;
    console.log("player = ");
    console.log(player);
    if (player != undefined) {
        res.send(readJson(`${RESOURCES_PATH}json/2.json`));
    } else {
        var json = JSON.parse("{}");
        json.error = "Rien n'a été envoyé! Comment suis-je censé répondre?";
        res.send(json);
    }
});

app.listen(3000, () => { console.log("Server running on port 3000"); });
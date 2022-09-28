/* ==========================
 * ====== DATABASE API ======
 ========================= */
const db = require("./database/models");

module.exports = {
    createNewPlayer,
    updatePlayer,
}

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
}).catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

async function createNewPlayer() {
    // Créer un nouveau joueur dans la base de données
}

async function updatePlayer(player: any) {
    // Mettre à jour le joueur dans la base de données    
}
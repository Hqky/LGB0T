const mineflayer = require('mineflayer')
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const pathfinder = require('mineflayer-pathfinder').pathfinder
const armorManager = require("mineflayer-armor-manager");
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const pvp = require('mineflayer-pvp').plugin
const { GoalBlock } = require('mineflayer-pathfinder').goals
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//////////////////////////////
const FgBlack = "\x1b[30m"  //
const FgRed = "\x1b[31m"    //
const FgGreen = "\x1b[32m"  //
const FgYellow = "\x1b[33m" //
const FgBlue = "\x1b[34m"   //
const FgMagenta = "\x1b[35m"//
const FgCyan = "\x1b[36m"   //
const FgWhite = "\x1b[37m"  //
//////////////////////////////

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Init
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

const bot = mineflayer.createBot({
    host: 'play.derycube.fr',
    username: 'LGB0T',
    //password: '12345678' // minecraft password, comment out if you want to log into online-mode=false servers
    // port: 25565,                // only set if you need a port that isn't 25565
    version: "1.9.4",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
    // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
})

const mcData = require('minecraft-data')(bot.version)

navigatePlugin(bot);
bot.loadPlugin(pathfinder);
bot.loadPlugin(navigatePlugin);

bot.once("spawn", () => {
    setInterval(lookAtNearestPlayer, 200);
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Var Global
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

let roles = ["Villageois", "Loup-Garou", "Loup-Garou Blanc", /*"Sorcière",*/ "Voyante", "Chasseur", "Assassin"];
let description = {
    "Villageois": "Vous faite parti des villageois et devez gagner avec eux. Vous n'avez pas de particularité.",
    "Loup-Garou": "Vous faite parti des Loup-Garou et devez gagner avec eux. Vous choisissez chaque nuit avec votre groupe un joueur à tuer. Vous pouvez parler entre loup via le -chatlg dans mes mp.",
    "Loup-Garou Blanc": "Vous faire parti des Loup-Garou mais vous devez gagner solo ! Vous choisissez aussi avec les autres Loup qui tuer la nuit. Vous pouvez parler entre loup via le -chatlg dans mes mp.",
    /*"Sorcière": "Vous faite parti des villageois et devez gagner avec eux. Vous avec une potion de soin et de mort. Vous pouvez les utilisers une seul fois. Si une personne meurt pendant la nuit vous êtes alerté.",*/
    "Voyante": "Vous faite parti des villageois et devez gagner avec eux. Chaque soir vous pouvez espionner le role d'un joueur.",
    "Chasseur": "Vous faite parti des villageois et devez gagner avec eux. Si vous mourrez vous obtiendrez un fusil et pourrai tuer une personne.",
    "Assassin": "Vous faite parti des solos. Chaque nuit vous pouvez une personne que vous souhaitez."
}
let roles_select = ["Villageois", "Chasseur", "Loup-Garou", "Loup-Garou", "Voyante", "Assassin"];
let joueurs = [];
let couple = [];
let rolesjoueurs = {};

let nb_nuits = 0;
let nb_jours = 0;
let nuit = false;
let playing = false;

let vote_lg = "";
let vote_as = "";
let voyante_check = "";
let soso_choix = "";
let soso_potion = 3; // 1 revive / 2 death
let vote_chasseur = "";
let can_vote_chasseur = false;

let vote_maire_use = [];
let vote_maire = {};
let can_vote_maire = false;
let maire = "";

let vote_kill_use = [];
let vote_kill = {};
let can_vote_kill = false;
let kill = "";

let tour = "";


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Fonction Global
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

//INIT

function registerPlayer(playername) {
    if (joueurs.length == roles_select.length) {
        bot.chat("/msg " + playername + " La game est full.");
        return;
    }
    if (joueurs.includes(playername)) {
        bot.chat("/msg " + playername + " Vous êtes déjà enregistré dans cette game.");
        return;
    }
    joueurs.push(playername);
    bot.chat("/msg " + playername + " Vous avez bien été enregistré pour cette game !");
    sendLongMPMessage("Joueurs participant: " + JSON.stringify(joueurs), playername);
    bot.chat("[+] " + playername);
}

function unregisterPlayer(playername) {
    if (!joueurs.includes(playername)) {
        bot.chat("/msg " + playername + " Vous n'êtes pas enregistré dans cette game.");
        return;
    }
    let index = joueurs.indexOf(playername);
    joueurs.splice(index, 1);
    bot.chat("/msg " + playername + " Vous avez bien été désenregistré pour cette game !");
    bot.chat("[-] " + playername);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendLongMessage(message) {
    let sendText = "";
    const words = message.split(" ");
    words.forEach((word) => {
        if ((sendText + word).length > 100) {
            bot.chat(sendText.trim());
            sendText = "";
        }
        sendText += word + " ";
    });
    if (sendText.trim().length > 0)
        bot.chat(sendText.trim());
}

function sendLongMPMessage(message, playername) {
    let sendText = "";
    const words = message.split(" ");
    words.forEach((word) => {
        if ((sendText + word).length > (100 - playername.length - 6)) {
            bot.chat("/msg " + playername + " " + sendText.trim());
            sendText = "";
        }
        sendText += word + " ";
    });
    if (sendText.trim().length > 0)
        bot.chat("/msg " + playername + " " + sendText.trim());
}

async function waitForStringToBeNonEmpty(getString, interval = 100) {
    return new Promise((resolve) => {
        const checkString = setInterval(() => {
            const str = getString(); // Get the current string value
            if (str && str.trim() !== "") {
                clearInterval(checkString); // Stop checking once the string is non-empty
                resolve(str); // Resolve the promise with the non-empty string
            }
        }, interval); // Check every 'interval' milliseconds
    });
}

async function waitForStringToBeNonEqual(oldString, getString, interval = 100) {
    return new Promise((resolve) => {
        const checkString = setInterval(() => {
            const str = getString(); // Get the current string value
            if (str && str.trim() !== oldString) {
                clearInterval(checkString); // Stop checking once the string is non-empty
                resolve(str); // Resolve the promise with the non-empty string
            }
        }, interval); // Check every 'interval' milliseconds
    });
}

function getKeyByValue(object, targetValue) {
    return Object.entries(object).find(([key, value]) => value === targetValue)?.[0];
}

//GAME

function attributionRoles() {
    joueurs.forEach(joueur => {
        i = getRandomInt(roles_select.length);
        rolesjoueurs[joueur] = roles_select[i];
        roles_select.splice(i, 1);
        console.log(i);
        console.log(JSON.stringify(roles_select));
        console.log(JSON.stringify(rolesjoueurs));
    });
}

function giveDescription() {
    Object.entries(rolesjoueurs).forEach(([key, value]) => {
        bot.chat("/msg " + key + " Vous êtes " + value);
        sendLongMPMessage(description[value], key);
    });
}

function cyclejournuit() {
    if (nuit == true) {
        bot.chat("Le jour se lève.");
        nb_jours += 1;
        bot.chat("---------- [JOUR " + nb_jours + "] ----------");
    } else {
        bot.chat("La nuit tombe sur le village.");
        nb_nuits += 1;
        bot.chat("---------- [NUIT " + nb_nuits + "] ----------");
        bot.chat("[LG] Rappel: Faite -vote <pseudo> pour choisir,");
        bot.chat("le joueur sur le quel vous voulez faire l'action.")
    }
    nuit = !nuit;
}

function resetVoteMaire() {
    joueurs.forEach(joueur => {
        vote_maire[joueur] = 0;
    });
}

function resetVoteKill() {
    joueurs.forEach(joueur => {
        vote_kill[joueur] = 0;
    });
}

function showVoteMaire() {
    bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    bot.chat("Liste des votes pour le maire:");
    Object.entries(vote_maire).forEach(([key, value]) => {
        bot.chat("- " + key + " : " + value + " vote(s)");
    });
    bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
}

function showVoteKill() {
    bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    bot.chat("Liste des votes pour le pendu:");
    Object.entries(vote_kill).forEach(([key, value]) => {
        bot.chat("- " + key + " : " + value + " vote(s)");
    });
    bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
}

function attributionMaire() {
    i = 0;
    Object.entries(vote_maire).forEach(([key, value]) => {
        if (value > i)
            maire = key;
    });
}

function attributionKill() {
    i = 0;
    Object.entries(vote_kill).forEach(([key, value]) => {
        if (value > i)
            kill = key;
    });
    j = joueurs.indexOf(kill);
    joueurs.splice(j, 1);
}

function checkEnd() {
    if (Object.values(rolesjoueurs).every(value => value === "Loup-Garou")) {
        bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
        bot.chat(" ");
        bot.chat(" Victoire des Loups-Garou ");
        bot.chat(" ");
        bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
        return true;
    }
    if (rolesjoueurs.length == 1) {
        if (Object.values(rolesjoueurs)[0] === "Assassin") {
            bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
            bot.chat(" ");
            bot.chat(" Victoire de l'Assassin ");
            bot.chat(" ");
            bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
            return true;
        } else if (Object.values(rolesjoueurs)[0] === "Loup-Garou Blanc") {
            bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
            bot.chat(" ");
            bot.chat("Victoire du Loup-Garou Blanc");
            bot.chat(" ");
            bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
            return true;
        }
    }
    if (["Loup-Garou", "Assassin", "Loup-Garou Blanc"].every(value => !Object.values(rolesjoueurs).includes(value))) {
        bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
        bot.chat(" ");
        bot.chat(" Victoire du Village ");
        bot.chat(" ");
        bot.chat("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
        return true;
    }
    return false;
}

//LOUP GAROU

function voteLG(playername) {
    Object.entries(rolesjoueurs).forEach(([key, value]) => {
        if (value.includes("Loup-Garou"))
            bot.chat("/msg " + key + " Votre groupe de loup a voté: " + playername);
    });
}

function listLG() {
    const listlg = []
    Object.entries(rolesjoueurs).forEach(([key, value]) => {
        if (value.includes("Loup-Garou"))
            listlg.push(key);
    });
    Object.entries(rolesjoueurs).forEach(([key, value]) => {
        if (value.includes("Loup-Garou"))
            bot.chat("/msg " + key + " List des loups: " + listlg);
    });
}

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      MP COMMANDS
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
let WHITELISTED = ['PerrierBottle', 'Hezzyox'];
let ADMIN = ['PerrierBottle', 'Hezzyox'];
let BLACKLISTED = [];


bot.on('message', async (message) => {
    const pseudo = message.toString().replace("Messages ┃ Message reçu de ", "").split(":")[0];
    if (pseudo == bot.username) return;
    if (BLACKLISTED.indexOf(pseudo) != -1) {
        bot.chat("/msg " + pseudo + " You are blacklisted bozo");
        return;
    }

    if (!message.toString().includes("Messages ┃ Message reçu de")) return;

    const cmd = message.toString().replace("Messages ┃ Message reçu de " + pseudo, "").split(": ").pop();


    if (cmd.toString().toLowerCase().startsWith("-help")) {
        bot.chat("/msg " + pseudo + " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        bot.chat("/msg " + pseudo + " ┃ Je suis un Bot Loup-Garou")
        bot.chat("/msg " + pseudo + " ┃ de Thiercelieux.")
        bot.chat("/msg " + pseudo + " ┃ ")
        bot.chat("/msg " + pseudo + " ┃ Si vous le souhaitez vous")
        bot.chat("/msg " + pseudo + " ┃ pouvez venir jouer sur la")
        bot.chat("/msg " + pseudo + " ┃ zone A-1594 !")
        bot.chat("/msg " + pseudo + " ┃ ")
        bot.chat("/msg " + pseudo + " ┃ Dev par PerrierBottle.")
        bot.chat("/msg " + pseudo + " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")


    } else if (cmd.toString().toLowerCase().startsWith("-tp")) {

        if (WHITELISTED.indexOf(pseudo) != -1)
            bot.chat("/tp " + pseudo)

    } else if (cmd.toString().toLowerCase().startsWith("-say")) {

        let say = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-say", "")
        if (ADMIN.indexOf(pseudo) != -1)
            bot.chat(say)

    } else if (cmd.toString().toLowerCase().startsWith("-execute")) {

        let execute = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace(" -execute ", "").replace("/", "")
        if (ADMIN.indexOf(pseudo) != -1)
            bot.chat("/" + execute)
    } else if (cmd.toString().toLowerCase().startsWith("-leave")) {

        if (ADMIN.indexOf(pseudo) != -1)
            bot.quit();
    } else if (cmd.toString().toLowerCase().startsWith("-lg")) {
        if (ADMIN.indexOf(pseudo) != -1) {
            bot.chat('/msg ' + pseudo + ' Connexion au FreeCube en cours..')
            bot.setQuickBarSlot(3);
            bot.activateItem(false);
            bot.on('windowOpen', function (window) {
                bot.clickWindow(5, 0, 0);
            });
            bot.on('windowOpen', function (window) {
                bot.clickWindow(14, 0, 0);
            });
            bot.chat('/msg ' + pseudo + ' Connexion au FreeCube établie')
            await sleep(400);
            bot.chat("/tp PerrierBottle")
        }
    } else if (cmd.toString().toLowerCase().startsWith("-join fc")) {

        if (ADMIN.indexOf(pseudo) != -1) {
            bot.chat('/msg ' + pseudo + ' Connexion au FreeCube en cours..')
            bot.setQuickBarSlot(3);
            bot.activateItem(false);
            bot.on('windowOpen', function (window) {
                bot.clickWindow(5, 0, 0);
            });
            bot.on('windowOpen', function (window) {
                bot.clickWindow(14, 0, 0);
            });
            bot.chat('/msg ' + pseudo + ' Connexion au FreeCube établie')
        }
    } else if (cmd.toString().toLowerCase().startsWith("-admin")) {
        if (ADMIN.indexOf(pseudo) != -1) {
            if (cmd.toString().toLowerCase().includes("-admin list")) {
                sendLongMPMessage(JSON.stringify(joueurs), pseudo);
            } else if (cmd.toString().toLowerCase().includes("-admin roles")) {
                sendLongMPMessage(JSON.stringify(roles_select), pseudo);
            } else if (cmd.toString().toLowerCase().includes("-admin kill")) {

            } else if (cmd.toString().toLowerCase().includes("-admin")) {
                bot.chat("/msg " + pseudo + " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                bot.chat("/msg " + pseudo + " ┃ Commands Admin:")
                bot.chat("/msg " + pseudo + " ┃ -admin list")
                bot.chat("/msg " + pseudo + " ┃ -admin roles")
                bot.chat("/msg " + pseudo + " ┃ -admin kill")
                bot.chat("/msg " + pseudo + " ┃ -start")
                bot.chat("/msg " + pseudo + " ┃ -information")
                bot.chat("/msg " + pseudo + " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
            }
        }
    } else if (cmd.toString().toLowerCase().startsWith("-end")) {
        if (ADMIN.indexOf(pseudo) != -1) {
            roles_select = ["Villageois", "Loup-Garou", "Loup-Garou Blanc", "Voyante", "Chasseur", "Assassin"];
            joueurs = [];
            couple = [];
            rolesjoueurs = {};
            nb_nuits = 0;
            nb_jours = 0;
            nuit = false;
            playing = false;

            vote_lg = "";
            vote_as = "";
            voyante_check = "";
            soso_choix = "";
            soso_potion = 3; // 1 revive / 2 death

            tour = "";

            bot.chat("Game reset !")
        }
    } else if (cmd.toString().toLowerCase().startsWith("-information")) {
        if (ADMIN.indexOf(pseudo) != -1) {
            bot.chat("---------- [ Information ] ----------");
            await sleep(250);
            bot.chat("Toutes les commandes sont à faire");
            await sleep(250);
            bot.chat("dans les mp du bot.");
            await sleep(250);
            bot.chat("(/msg LGB0T <command>");
            await sleep(250);
            bot.chat("Vous pouvez seulement parler");
            await sleep(250);
            bot.chat("dans le tchat de jour.");
            await sleep(250);
            bot.chat("De plus le maire à deux vote");
            await sleep(250);
            bot.chat("au lieu d'un !");
            await sleep(250);
            bot.chat("Lors d'une action vous pouvez mettre 'aucun'");
            await sleep(250);
            bot.chat("si vous souhaitez tuer personne.");
            await sleep(250);
            bot.chat("---------- [  Bon Jeu   ] ----------");
        }
    }
    else if (cmd.toString().toLowerCase().startsWith("-start")) {
        if (ADMIN.indexOf(pseudo) != -1) {
            sendLongMessage("Joueurs participant: " + JSON.stringify(joueurs));
            await sleep(5000);
            attributionRoles();
            playing = true;
            bot.chat("[LG]: Démarrage dans 10sec..");
            await sleep(5000);
            bot.chat("[LG]: Démarrage dans 5sec..");
            await sleep(2000);
            bot.chat("[LG]: Démarrage dans 3sec..");
            await sleep(1000);
            bot.chat("[LG]: Démarrage dans 2sec..");
            await sleep(1000);
            bot.chat("[LG]: Démarrage dans 1sec..");
            await sleep(1000);
            giveDescription();
            listLG();
            await sleep(5000);

            while (true) {
                cyclejournuit();
                if (Object.values(rolesjoueurs).includes("Loup-Garou") || Object.values(rolesjoueurs).includes("Loup-Garou Blanc")) {
                    bot.chat("[LG]: Les loups-garou se reveillent et désigne une personne à tuer.");
                    vote_lg = "";
                    await waitForStringToBeNonEmpty(() => vote_lg);
                    voteLG(vote_lg);
                }
                if (Object.values(rolesjoueurs).includes("Voyante")) {
                    bot.chat("[LG]: La voyante se reveille et choisis de voir les plus profond désire d'un des joueurs.");
                    voyante_check = "";
                    await waitForStringToBeNonEmpty(() => voyante_check);
                    bot.chat("/msg " + getKeyByValue(rolesjoueurs, "Voyante") + " Le role de " + voyante_check + " est " + rolesjoueurs[voyante_check]);
                }
                if (Object.values(rolesjoueurs).includes("Sorcière")) {
                    bot.chat("[LG]: La sorcière concocte une potion de vie ou de mort.");
                    soso_choix = "";
                    await waitForStringToBeNonEmpty(() => soso_choix);

                }
                if (Object.values(rolesjoueurs).includes("Assassin")) {
                    bot.chat("[LG]: Une pultion meurtrière anime l'assassin.");
                    vote_as = "";
                    await waitForStringToBeNonEmpty(() => vote_as);
                }

                await sleep(3000);

                cyclejournuit();

                await sleep(150);

                if (vote_lg.toLowerCase() != "aucun" && vote_lg != "") {
                    bot.chat("[LG]: " + vote_lg + " a été tué.");
                    bot.chat("[LG]: Il était " + rolesjoueurs[vote_lg]);
                    await sleep(150);
                    if (rolesjoueurs[vote_lg] === "Chasseur") {
                        can_vote_chasseur = !can_vote_chasseur;
                        bot.chat("[LG]: Le chasseur sort son fusil.");
                        bot.chat("/msg " + vote_lg + " Faite -ckill <pseudo> pour désigner qui tuer.");
                        bot.chat("/msg " + vote_lg + " Vous pouvez tuer personne en faisant -ckill aucun");
                        await waitForStringToBeNonEmpty(() => vote_chasseur);
                        if (vote_chasseur != "aucun") {
                            bot.chat("[LG]: " + vote_chasseur + " a été tué.");
                            let index = joueurs.indexOf(vote_chasseur);
                            joueurs.splice(index, 1);
                        }
                    }

                    let index = joueurs.indexOf(vote_lg);
                    joueurs.splice(index, 1);
                }
                await sleep(150);
                if (vote_as.toLowerCase() != "aucun" && vote_as != "") {
                    bot.chat("[LG]: " + vote_as + " a été tué.");
                    bot.chat("[LG]: Il était " + rolesjoueurs[vote_as]);
                    await sleep(150);
                    if (rolesjoueurs[vote_as] === "Chasseur") {
                        can_vote_chasseur = !can_vote_chasseur;
                        bot.chat("[LG]: Le chasseur sort son fusil.");
                        bot.chat("/msg " + vote_as + " Faite -ckill <pseudo> pour désigner qui tuer.");
                        bot.chat("/msg " + vote_as + " Vous pouvez tuer personne en faisant -ckill aucun");
                        await waitForStringToBeNonEmpty(() => vote_chasseur);
                        if (vote_chasseur != "aucun") {
                            bot.chat("[LG]: " + vote_chasseur + " a été tué.");
                            let index = joueurs.indexOf(vote_chasseur);
                            joueurs.splice(index, 1);
                        }
                    }

                    let index = joueurs.indexOf(vote_as);
                    joueurs.splice(index, 1);
                }

                if (checkEnd())
                    break

                await sleep(3000);

                if (nb_jours == 1) {
                    resetVoteMaire();
                    bot.chat("---------- [Vote du Maire] ----------");
                    await sleep(250);
                    bot.chat("[LG]: L'election pour les maires sont ouverts !");
                    await sleep(250);
                    bot.chat("[LG]: Vous pouvez débattre de qui voter.");
                    await sleep(250);
                    bot.chat("[LG]: Vous pouvez voter le maire via le");
                    await sleep(250);
                    bot.chat("[LG]: -votemaire <Pseudo>.");
                    await sleep(250);
                    bot.chat("[LG]: Veuillez indiquer correctement le");
                    await sleep(250);
                    bot.chat("[LG]: pseudo (Majs, underscore, ect..)");
                    await sleep(250);
                    bot.chat("[LG]: Vous ne pouvez voter que une seul fois !");
                    await sleep(250);
                    bot.chat("---------- [Vote du Maire] ----------");
                    await sleep(5000);
                    bot.chat("[LG]: Vous avez 2min.");
                    can_vote_maire = !can_vote_maire;
                    await sleep(1000 * 60 * 1);
                    bot.chat("[LG]: Il vous reste 1min.");
                    await sleep(1000 * 30);
                    bot.chat("[LG]: Il vous reste 30sec.");
                    await sleep(1000 * 25);
                    bot.chat("[LG]: Il vous reste 5sec.");
                    await sleep(1000 * 5);
                    can_vote_maire = !can_vote_maire;
                    attributionMaire();
                    bot.chat("[LG]: Les éléctions sont fini. Le maire est " + maire);
                    await sleep(3000);
                }
                if (!joueurs.includes(maire)) {
                    bot.chat("[LG]: Le maire est mort. Il choisit donc un nouveau maire.");
                    await waitForStringToBeNonEqual(maire, () => maire);
                    bot.chat("[LG]: Le nouveau maire est " + maire);
                    await sleep(3000);
                }
                resetVoteKill();
                bot.chat("---------- [Vote du Pendu] ----------");
                await sleep(250);
                bot.chat("[LG]: C'est l'heure du vote du pendu.");
                await sleep(250);
                bot.chat("[LG]: Vous avez 3min pour débattre");
                await sleep(250);
                bot.chat("[LG]: sur qui éléminer.");
                await sleep(250);
                bot.chat("[LG]: Pour voter utiliser la");
                await sleep(250);
                bot.chat("[LG]: commande: -votekill <pseudo>");
                await sleep(250);
                bot.chat("---------- [Vote du Pendu] ----------");
                await sleep(5000);
                can_vote_kill = !can_vote_kill;
                await sleep(1000 * 60 * 1);
                bot.chat("[LG]: Vous avez 2min.");
                await sleep(1000 * 60 * 1);
                bot.chat("[LG]: Il vous reste 1min.");
                await sleep(1000 * 30);
                bot.chat("[LG]: Il vous reste 30sec.");
                await sleep(1000 * 25);
                bot.chat("[LG]: Il vous reste 5sec.");
                await sleep(1000 * 5);
                can_vote_kill = !can_vote_kill;
                attributionKill();
                bot.chat("[LG]: Le vote du pendu est terminé.");
                bot.chat("[LG]: Le joueur éliminé est " + kill);

                if (checkEnd())
                    break
            }

        }
    } else if (cmd.toString().toLowerCase().startsWith("-register")) {
        if (playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas vous register pendant une game.")
        else
            registerPlayer(pseudo);
    } else if (cmd.toString().toLowerCase().startsWith("-unregister")) {
        if (playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas vous unregister pendant une game.")
        else
            unregisterPlayer(pseudo);
    } else if (cmd.toString().toLowerCase().startsWith("-vote ")) {
        if (!playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas voté si la game n'est pas démarée.")
        else {
            if (joueurs.includes(pseudo)) {
                let playervote = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-vote", "").replace(/[ \t\n\r\f\v\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+/g, '');
                if (playervote != "aucun" && !joueurs.includes(playervote)) {
                    bot.chat("/msg " + pseudo + " " + playervote + " n'est pas dans la game.");
                    return;
                }
                switch (rolesjoueurs[pseudo]) {
                    case "Loup-Garou":
                    case "Loup-Garou Blanc":
                        vote_lg = playervote;
                        break;
                    case "Voyante":
                        voyante_check = playervote;
                        break;
                    case "Assassin":
                        vote_as = playervote;
                        break
                    default:
                        bot.chat("/msg " + pseudo + " Ton role ne peut pas voter.");
                        break
                }
            } else {
                bot.chat("/msg " + pseudo + " Vous n'êtes pas dans la game actuel.")
            }
        }
    } else if (cmd.toString().toLowerCase().startsWith("-votemaire")) {
        if (!playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas voté si la game n'est pas démarée.")
        else {
            if (joueurs.includes(pseudo)) {
                let playervote = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-votemaire", "").replace(/[ \t\n\r\f\v\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+/g, '');
                if (!can_vote_maire) {
                    bot.chat("/msg " + pseudo + " Les votes pour le maire ne sont pas activé.");
                    return;
                }
                if (vote_maire_use.includes(pseudo)) {
                    bot.chat("/msg " + pseudo + " Vous avez déjà voté.");
                    return;
                }
                if (playervote != "aucun" && !joueurs.includes(playervote)) {
                    bot.chat("/msg " + pseudo + " Ce joueur est mort ou n'est pas la partie.");
                    return;
                }
                vote_maire_use.push(pseudo);
                vote_maire[playervote] = vote_maire[playervote] + 1;
                showVoteMaire();
                bot.chat("/msg " + pseudo + " Votre vote a été enregistré !");
            } else
                bot.chat("/msg " + pseudo + " Vous n'êtes pas dans la game actuel.");
        }
    } else if (cmd.toString().toLowerCase().startsWith("-votekill")) {
        if (!playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas voté si la game n'est pas démarée.")
        else {
            if (joueurs.includes(pseudo)) {
                let playervote = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-votekill", "").replace(/[ \t\n\r\f\v\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+/g, '');
                if (!can_vote_kill) {
                    bot.chat("/msg " + pseudo + " Les votes pour le pendu ne sont pas activé.");
                    return;
                }
                if (vote_kill_use.includes(pseudo)) {
                    bot.chat("/msg " + pseudo + " Vous avez déjà voté.");
                    return;
                }
                if (playervote != "aucun" && !joueurs.includes(playervote)) {
                    bot.chat("/msg " + pseudo + " Ce joueur est mort ou n'est pas la partie.");
                    return;
                }
                vote_kill_use.push(pseudo);
                if (pseudo == maire)
                    vote_kill[playervote] = vote_kill[playervote] + 1;
                vote_kill[playervote] = vote_kill[playervote] + 1;
                showVoteKill();
                bot.chat("/msg " + pseudo + " Votre vote a été enregistré !");
            } else
                bot.chat("/msg " + pseudo + " Vous n'êtes pas dans la game actuel.");
        }
    } else if (cmd.toString().toLowerCase().startsWith("-ckill")) {
        if (!playing)
            bot.chat("/msg " + pseudo + " Vous ne pouvez pas voté si la game n'est pas démarée.")
        else {
            if (joueurs.includes(pseudo)) {
                let playervote = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-ckill", "").replace(/[ \t\n\r\f\v\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]+/g, '');
                if (!can_vote_chasseur) {
                    bot.chat("/msg " + pseudo + " Le kill du chasseur n'est pas activé.");
                    return;
                }
                if (vote_chasseur != "") {
                    bot.chat("/msg " + pseudo + " Vous avez déjà tiré.");
                    return;
                }
                vote_chasseur = playervote;
                bot.chat("[LG]: Le chasseur tire sur " + playervote);
            } else
                bot.chat("/msg " + pseudo + " Vous n'êtes pas dans la game actuel.");
        }
    } else if (cmd.toString().toLowerCase().startsWith("-chatlg")) {
        if (playing) {
            let msg = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ":", "").replace("-chatlg", "")
            if (!rolesjoueurs[pseudo].includes("Loup-Garou")) {
                bot.chat("/msg " + pseudo + " Vous ne pouvez pas parler dans le tchat des loups.")
                return;
            }
            if (msg.length > 30) {
                bot.chat("/msg " + pseudo + " Ce messages est trop long.")
            }
            Object.entries(rolesjoueurs).forEach(([key, value]) => {
                if (value.includes("Loup-Garou") && key != pseudo)
                    bot.chat("/msg " + key + " [" + pseudo + "] " + msg);
            });
        }
    } else if (cmd.toString().toLowerCase().startsWith("-chatcpl")) {
        if (playing) {
            let msg = message.toString().replace("Messages ┃ Message reçu de " + pseudo + ": ", "").replace("-chatcpl", "")
            if (!couple.includes(pseudo)) {
                bot.chat("/msg " + pseudo + " Vous ne pouvez pas parler dans le tchat des loups.")
                return;
            }
            if (msg.length > 30) {
                bot.chat("/msg " + pseudo + " Ce messages est trop long.")
            }
            couple.forEach(playername => {
                if (playername != pseudo)
                    bot.chat("/msg " + playername + " [" + pseudo + "]" + msg);
            });
        }
    } else {
        bot.chat("/msg " + pseudo + " Command invalide: -help")
    }
});


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Bot Path Finding
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

bot.once("spawn", () => {
    mineflayerViewer(bot, { port: 3000, firstPerson: true })
    mineflayerViewer(bot, { port: 3001, viewDistance: 3 })
    bot.on('path_update', (r) => {
        const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
        if (r.status == "timeout") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite + `I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgRed + ` ${r.status}` + FgWhite)
        }
        if (r.status == "parial") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite + `I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgYellow + ` ${r.status}` + FgWhite)
        }
        if (r.status == "success") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite + `I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgGreen + ` ${r.status}` + FgWhite)
        }
        const path = [bot.entity.position.offset(0, 0.5, 0)]
        for (const node of r.path) {
            path.push({ x: node.x, y: node.y + 0.5, z: node.z })
        }
        bot.viewer.drawLine('path', path, 0xff0000)
    })

    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)

    defaultMove.canDig = false // Disable breaking of blocks when pathing 
    defaultMove.scafoldingBlocks.push(mcData.itemsByName['sandstone', 'wool'].id)


    bot.viewer.on('blockClicked', (block, face, button) => {
        if (button !== 1) return // only right click

        const p = block.position.offset(0, 1, 0)

        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
    })
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      CHAT LOGS
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

bot.on('message', (message) => {
    chat = message.toAnsi().toString()
    console.log(FgCyan + '[Chat]' + FgWhite + " " + chat);

    if (chat == "disconnect.spam")
        bot.chat("/msg PerrierBottle I have been kicked for disconnect.spam");
});

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Bot Look Player
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


function lookAtNearestPlayer() {
    let nearestPlayer;
    let nearestDistance = Infinity;

    // Check if bot's position is defined
    if (!bot.entity || !bot.entity.position) return;

    // Iterate through all players
    for (const playerName in bot.players) {
        if (playerName == bot.username) continue;
        const player = bot.players[playerName];

        // Check if player's entity is defined
        if (!player.entity || !player.entity.position) continue;

        // Calculate distance
        const distance = bot.entity.position.distanceTo(player.entity.position);

        // Update nearest player if closer
        if (distance < nearestDistance) {
            nearestPlayer = player;
            nearestDistance = distance;
        }
    }

    // Look at nearest player
    if (nearestPlayer) {
        bot.lookAt(nearestPlayer.entity.position.offset(0, nearestPlayer.entity.height, 0));
    }
}

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Bot Error or Kicked
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

bot.on('kicked', (reason, loggedin) => {
    console.log(FgRed + "Kicked Reason: " + reason + FgWhite)
})

//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      Player Join & Leave
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬


bot.on('playerJoined', (player) => {

});

bot.on('playerLeft', (player) => {
    if (joueurs.includes(player.username)) {
        i = joueurs.indexOf(player.username);
        joueurs.splice(i, 1);
        bot.chat("[-] " + player.username);
    }
});
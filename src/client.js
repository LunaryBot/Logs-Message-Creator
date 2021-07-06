require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();

require("./functions/quote");
require("./handlers/commandHandler")(client);

client.login(process.env.TOKEN);
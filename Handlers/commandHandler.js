const { Collection } = require("discord.js");
const ascii = require("ascii-table");
const fs = require("fs");
const { resolve } = require("path");

function loadCommands(client) {
  const table = new ascii().setHeading("File Name", "Status");
  require("colors");

  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./Commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(resolve(__dirname, `../Commands/${folder}`))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      // Ensure commandFile.data exists and contains 'name' property
      if (commandFile && commandFile.data && commandFile.data.name) {
        const properties = { folder, ...commandFile };
        client.commands = new Collection(); // Assuming client.commands is a Collection
        client.commands.set(commandFile.data.name, properties); // Assuming commandFile.data contains the command's information, including its name

        commandsArray.push(commandFile.data.toJSON()); // Assuming commandFile.data is a valid structure and toJSON() returns JSON data

        table.addRow(file, "✔️");
      } else {
        console.error(`Invalid command structure in file: ${file}`);
        table.addRow(file, "❌");
      }
    }
  }

  // Assuming client.application.commands.set() accepts an array of command data
  client.application.commands
    .set(commandsArray)
    .then(() =>
      console.log(table.toString(), "\n[+]".green + " Loaded Commands")
    )
    .catch((error) => console.error("Error loading commands:", error));
}

module.exports = { loadCommands };

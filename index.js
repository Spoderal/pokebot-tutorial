const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const db = require("quick.db");

const pokedex = require("./pokedex.json");

const wildpokemon = [pokedex.Pokemon.WildPokemon.Caterpie, pokedex.Pokemon.WildPokemon.Pidgey, pokedex.Pokemon.WildPokemon.PidgeyL3]

const prefix = config.prefix;

client.on("message", message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  function random_item(wildpokemon)
    {
      
    return wildpokemon[Math.floor(Math.random()*wildpokemon.length)];
         
    }
    

    if(message.content == prefix + "walk"){
        var appearedPokemon = random_item(wildpokemon);

        var embed = new Discord.MessageEmbed()
        .setTitle(`A wild ${appearedPokemon.Name} appeared!`)
        .addField("Level", `${appearedPokemon.Level}`)
        .setImage(`${appearedPokemon.Image}`)


        message.channel.send(embed)
    }

        
    

  if(message.content == prefix + "start"){
    message.channel.send("Choose from the following starters: Charmander, Squirtle, Bulbasaur");

      const filter = m => m.author.id === message.author.id;

        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000
        }).then(collected => {
            let pokemon = args[0]
             let gender = ["Male", "Female"];
             let randomgender = Math.floor(Math.random() * gender.length);
            if(collected.first().content === "Charmander"){
                db.set(`started_${message.author.id}`, true);
                db.push(`pokemonlist_${message.author.id}`, "Charmander");
                db.add(`pokemon_${message.author.id}`, 1);
                db.set(`starter_${message.author.id}`, "Charmander");
                db.set(`selected_${message.author.id}`, "Charmander")
                db.set(`starterlevel_${message.author.id}`, 6);
                return message.reply(`You chose Charmander! it is a ${gender[randomgender]} and level 6`)
            }
            if(collected.first().content === "Squirtle"){
                db.set(`started_${message.author.id}`, true);
                db.push(`pokemonlist_${message.author.id}`, "Squirtle");
                db.add(`pokemon_${message.author.id}`, 1);
                db.set(`starter_${message.author.id}`, "Squirtle");
                db.set(`selected_${message.author.id}`, "Squirtle")
                db.set(`starterlevel_${message.author.id}`, 6);
                return message.reply(`You chose Squirtle! it is a ${gender[randomgender]} and level 6`)
            }
            if(collected.first().content === "Bulbasaur"){
                db.set(`started_${message.author.id}`, true);
                db.push(`pokemonlist_${message.author.id}`, "Bulbasaur");
                db.add(`pokemon_${message.author.id}`, 1);
                db.set(`starter_${message.author.id}`, "Bulbasaur");
                db.set(`selected_${message.author.id}`, "Bulbasaur")
                db.set(`starterlevel_${message.author.id}`, 6);
                return message.reply(`You chose Bulbasaur! it is a ${gender[randomgender]} and level 6`)
            }
        
      })    }
});

client.login(config.token);
console.log("Bot online!")
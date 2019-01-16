//Base bot discord :
const Discord = require('discord.js');
const client = new Discord.Client();

//Variables :

var fs = require('fs');
var prefix = "i!";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Connexion en cours ...");
    setInterval(function() {

        var statut = [
          `i!help for help ^^`, 
          `ιהơדBot By FilEeaZaiR`,
          `${client.users.size} users`];
    
        var random = Math.floor(Math.random()*(statut.length));
    
        client.user.setPresence({ 
            game: { 
            name: statut[random],
            type: 0
          }
        });
      }, 30000); 
});

client.on("guildMemberAdd", member => {

    const bvn = member.guild.channels.find(m => m.name === "welcome");

    if(!bvn) return;

    var role = member.guild.roles.find("name", "Other");
    member.addRole(role).catch(console.error);

    var role2 = member.guild.roles.find("name", "-= No Members =-");
    member.addRole(role2).catch(console.error);

    let regles = member.guild.channels.find("name", "règles");
    bvn.send(`Bienvenue ${member}, n'hésite pas à lire les ` + regles + ` pour plus d'informations !`);

});

client.on("guildMemberAdd", member => {

    const logs = member.guild.channels.find(m => m.name === "logs");
    if (!logs) return;

    logs.send({
        embed: {
            color: 0xFE6F01,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL
            },
            title: "Arrivée d'un nouvel utilisateur",
            fields: [
            {
                name: "Un nouvel utilisateur vient d'arriver",
                value: `Il s'agit de [${member.user.tag}]`,
                inline: true
            },
            {
                name: `Nombre de membres après l'arrivée de __${member.user.tag}__`,
                value: member.guild.memberCount,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });
});

client.on("guildMemberRemove", member => {

    const logs = member.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
	
    logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL
            },
            title: "Départ d'un utilisateur",
	    image: {
		    url: "http://www.lesaffaires.com/uploads/images/normal/578f645f2123b12d0257dfa1fbdb8fff.jpg"
	    },
	    thumbnail: {
                        url: member.user.displayAvatarURL
            },
            fields: [
            {
                name: "Un utilisateur vient de partir",
                value: `Il s'agit de [${member.user.tag}]`,
                inline: true
            },
            {
                name: `Nombre de membres après le départ de __${member.user.tag}__`,
                value: member.guild.memberCount,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });

});

client.on("channelCreate", channel => {

  const logs = channel.guild.channels.find(m => m.name === "logs");
  if (!logs) return;
	
  logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: client.user.tag,
                icon_url: client.user.displayAvatarURL
            },
            title: "Nouveau salon créé ! :white_check_mark:",
            fields: [
            {
                name: "Channel créé !",
                value: `Le nom : **${channel.name}**`,
                inline: true
            },
            {
                name: `Nombre de salons après l'ajout du salon **${channel.name}**`,
                value: channel.guild.channels.size,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${channel.id} | FilEeaZaiR#1258`,
            }
        }
    });

});

client.on("channelDelete", channel => {

    const logs = channel.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
	
	logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: client.user.tag,
                icon_url: client.user.displayAvatarURL
            },
            title: "Un channel a été supprimé ! :x:",
            fields: [
            {
                name: "Channel suprimé !",
                value: `Le nom : **${channel.name}**`,
                inline: true
            },
            {
                name: `Nombre de salons après la suppression du channel **${channel.name}**`,
                value: channel.guild.channels.size,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${channel.id} | FilEeaZaiR#1258`,
            }
        }
    });

});

client.on("roleCreate", role => {
    const logs = role.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
	
	logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: client.user.tag,
                icon_url: client.user.displayAvatarURL
            },
            title: "Un rôle a été ajouté ! :white_check_mark:",
            fields: [
            {
                name: "Rôle ajouté !",
                value: `Le nom : **${channel.name}**`,
                inline: true
            },
            {
                name: `Nombre de rôles après la l'ajout du rôle **${channel.name}**`,
                value: channel.guild.roles.size,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${channel.id} | FilEeaZaiR#1258`,
            }
        }
    });

});

client.on("roleDelete", role => {
    const logs = role.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
	
	logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: client.user.tag,
                icon_url: client.user.displayAvatarURL
            },
            title: "Un rôle a été supprimé ! :x:",
            fields: [
            {
                name: "Rôle suprimé !",
                value: `Le nom : **${channel.name}**`,
                inline: true
            },
            {
                name: `Nombre de rôles après la suppression du rôle **${channel.name}**`,
                value: channel.guild.roles.size,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${channel.id} | FilEeaZaiR#1258`,
            }
        }
    });

});

client.on(`message`, message =>{
    
if(message.content.startsWith(prefix + "sondage")) {
    if(message.guild.member(message.author).roles.find("name", "-= Leaders =-")){
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var sondage_embed = new Discord.RichEmbed()
        .setDescription("Sondage")
        .addField(ThingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("18d67e")
	.setFooter(`Sondage par ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(sondage_embed)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function() {
        });

        message.delete()
    }else{
        return message.channel.send(" désolé, mais tu n'as pas la permission");
    }
}

if(message.content.startsWith(prefix + "inotif")) {

    message.delete()

    let user = message.guild.member(message.author);

    let role = message.guild.roles.find(m => m.id === "533636682482974741");
    if(!role) return console.log("Le rôle n'existe pas !");

    user.addRole(role).catch(console.error);
    message.channel.send(`**Vous avez maintenant le rôle !**`);
    
}

if(message.content.startsWith(prefix + "anti-inotif")) {

    message.delete()

    let user = message.guild.member(message.author);

    let role = message.guild.roles.find(m => m.id === "533636682482974741");
    if(!role) return console.log("Le rôle n'existe pas !");

    user.removeRole(role).catch(console.error);
    message.channel.send(`**Vous n'avez plus le rôle !**`);
    
}

if(message.content.startsWith(prefix + "news")) {
    if(message.guild.member(message.author).roles.find("name", "-= Leaders =-")){
        let arg = message.content.split(" ").slice(1)
        let args = arg.join(" ")
        if(!args) return message.reply(`**Merci de fournir un texte.**`);

        message.delete(message.author);
        message.channel.send({embed: {
            color: 0xFE6F01,
            author: {
                name: "ιהơדBot - News",
                icon_url: client.user.displayAvatarURL
            },
            fields: [
            {
                name: "News",
                value: args,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                text: `ιהơדNews`,
            }
        }
    });

    message.channel.send("<@533637357035847680>")
    .then(message => setTimeout(function(){message.delete()}, 1000))
    }else{
        return message.channel.send(" désolé, mais tu n'as pas la permission");
    }
    
}});

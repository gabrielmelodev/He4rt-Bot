const Discord = require('discord.js');

module.exports = async client => {
	const guild = client.guilds.get(process.env.GUILD_ID);

	client.user.setPresence({
		status: 'online',
		game: {
			name: 'a qualidade que você procura 💻 | heartdevs.com',
			type: 'STREAMING',
			url: 'https://www.twitch.tv/danielhe4rt',
		},
	});

	const enviarEmbedStatus = () => {
		const members = guild.memberCount;

		let numeroMembrosApresentados = 0;
		const lista = guild.members;
		lista.forEach(m => {
			if (m.roles.has(process.env.APRESENTOU_ROLE))
				numeroMembrosApresentados += 1;
		});

		const embed = new Discord.RichEmbed()
			.setTitle('``📶`` Página de Status')
			.addField('``👥`` **Usuários:**', `${members}`, true)
			.addField(
				'``🎓`` **Usuários apresentados:**',
				`${numeroMembrosApresentados}`,
				false
			)
			.addField(
				'``📡`` **Status da he4rtdevs.com:**',
				`${Math.round(client.ping)}ms`,
				true
			)
			.addField(
				'``📡`` **Status da API:**',
				`${Math.round(client.ping)}ms`,
				true
			)
			.addField(
				'``📡`` **Latência do Discord:**',
				`${Math.round(client.ping)}ms`,
				true
			)
			.setFooter('Última atualização:')
			.setColor('#36393E')
			.setTimestamp();

		client.channels.get(process.env.STATUS_PAGE_CHAT).bulkDelete(1);
		client.channels.get(process.env.STATUS_PAGE_CHAT).send(embed);
	};

	// depois de 2s que o bot logar, manda uma msg de status
	setTimeout(enviarEmbedStatus, 2000);

	// Manda a msg com o status a cada 35mim
	setInterval(() => {
		enviarEmbedStatus();
	}, 60000 * 35);
};
